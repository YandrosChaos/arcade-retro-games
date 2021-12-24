import Phaser from "phaser";
import { calculateHalfOfHalf } from "src/app/commons/functions/responsive.function";
import { UserService } from "src/app/commons/services/user/user.service";
import { Scene } from "../game-objects/scene";
import { SOUND_EFFECTS_VOLUME } from "./k-boom.config";
import {
  BACKGROUND_IMG_PATH,
  BACKGROUND_SECTION_NAME,
  SCORE_SCENE_NAME,
  START_SOUND_PATH,
  START_SOUND_SECTION_NAME,
  WELCOME_SCENE_NAME,
} from "./k-boom.routes";

export class ScoreScene extends Scene {
  private score: number;
  private tapCounter: number;

  private result: Phaser.GameObjects.Text;
  private hint: Phaser.GameObjects.Text;
  private hintText: string = "Touch to restart";

  private touchSound: Phaser.Sound.BaseSound;

  constructor() {
    super(SCORE_SCENE_NAME);
  }

  init(params: any): void {
    this.score = params.bombsCaught;
    UserService.sumPoints(this.score);
  }

  preload() {
    this.load.image(BACKGROUND_SECTION_NAME, BACKGROUND_IMG_PATH);
    this.load.audio(START_SOUND_SECTION_NAME, START_SOUND_PATH);

    this.tapCounter = 0;
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
    super.fadeInScene();
    this.buildSounds();
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
      () => {
        this.closeScene();
      },
      this
    );
  }

  private closeScene(): void {
    if (this.tapCounter >= 1) {
      this.touchSound.play();
      super.fadeOutScene(WELCOME_SCENE_NAME);
    } else {
      this.tapCounter++;
    }
  }

  private buildSounds(): void {
    this.touchSound = this.sound.add(START_SOUND_SECTION_NAME, {
      volume: SOUND_EFFECTS_VOLUME,
    });
  }
}
