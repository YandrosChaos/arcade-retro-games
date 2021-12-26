import Phaser from "phaser";
import { calculateHalfOfHalf } from "@functions/responsive.function";
import { UserService } from "@services/user/user.service";
import { Scene } from "@game-objects/scene";
import { SOUND_EFFECTS_VOLUME } from "@k-boom/config/k-boom.config";
import { Scenes } from "@k-boom/config/k-boom.names";
import {
  BACKGROUND_SECTION,
  WRONG_SOUND_SECTION,
} from "@k-boom/config/k-boom.section";
import { getImgPath, getSoundPath } from "@k-boom/functions/path.functions";

export class ScoreScene extends Scene {
  private score: number;
  private tapCounter: number;

  private result: Phaser.GameObjects.Text;
  private hint: Phaser.GameObjects.Text;
  private hintText: string = "Touch to restart";

  private touchSound: Phaser.Sound.BaseSound;

  constructor() {
    super(Scenes.Score);
  }

  init(params: any): void {
    this.score = params.bombsCaught;
    UserService.sumPoints(this.score);
  }

  preload() {
    this.load.image(BACKGROUND_SECTION, getImgPath(BACKGROUND_SECTION));
    this.load.audio(WRONG_SOUND_SECTION, getSoundPath(WRONG_SOUND_SECTION));

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
      BACKGROUND_SECTION
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
      super.fadeOutScene(Scenes.Welcome);
    } else {
      this.tapCounter++;
    }
  }

  private buildSounds(): void {
    this.touchSound = this.sound.add(WRONG_SOUND_SECTION, {
      volume: SOUND_EFFECTS_VOLUME,
    });
  }
}
