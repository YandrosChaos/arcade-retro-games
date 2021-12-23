import Phaser from "phaser";
import { calculateHalfOfHalf } from "src/app/commons/functions/responsive.function";
import { UserService } from "src/app/commons/services/user/user.service";
import {
  BACKGROUND_IMG_PATH,
  BACKGROUND_SECTION_NAME,
  SCORE_SCENE_NAME,
  WELCOME_SCENE_NAME,
} from "./k-boom.routes";

export class ScoreScene extends Phaser.Scene {
  private score: number;
  private result: Phaser.GameObjects.Text;
  private hint: Phaser.GameObjects.Text;
  private hintText: string = "Touch to restart";

  constructor() {
    super({
      key: SCORE_SCENE_NAME,
    });
  }

  init(params: any): void {
    this.score = params.bombsCaught;
    UserService.sumPoints(this.score);
  }

  preload() {
    this.load.image(BACKGROUND_SECTION_NAME, BACKGROUND_IMG_PATH);
  }

  update(time: number): void {
    const seconds: number = Number((time / 1000).toFixed(0));
    this.hint?.destroy();
    if (seconds % 2 !== 0) {
      this.hint = this.add.text(
        calculateHalfOfHalf(this.renderer.width) / 2,
        this.renderer.height - 100,
        this.hintText,
        {
          font: "2rem Minecraft",
          color: "#BC00FF",
        }
      );
    }
  }

  create(): void {
    this.fadeInScene();
    const background: Phaser.GameObjects.TileSprite = this.add.tileSprite(
      0,
      this.renderer.height / 2,
      this.renderer.width * 2,
      this.renderer.height * 2,
      BACKGROUND_SECTION_NAME
    );
    background.setAngle(90);
    const resultText: string = "Your score is " + this.score;
    this.result = this.add.text(
      calculateHalfOfHalf(this.renderer.width) / 1.5,
      calculateHalfOfHalf(this.renderer.height) - 100,
      resultText,
      {
        font: "2rem Minecraft",
        color: "#FBFBAC",
      }
    );
    this.input.on(
      "pointerdown",
      function (_) {
        this.fadeOutScene();
      },
      this
    );
  }

  private fadeInScene(): void{
    this.cameras.main.fadeIn(1000, 0, 0, 0);
  }

  private fadeOutScene(): void {
    this.cameras.main.fadeOut(1000, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => { this.scene.start(WELCOME_SCENE_NAME) })
  }

}
