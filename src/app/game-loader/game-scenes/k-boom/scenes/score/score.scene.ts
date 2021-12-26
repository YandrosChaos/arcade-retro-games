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
import { Sound } from "@k-boom/game-objects/sound/sound.interface";
import { Text } from "@k-boom/game-objects/text/text.interface";
import { TileSprite } from "@game-objects/tile-sprite";
import { HINT_TEXT_CONFIG, RESULT_TEXT_CONFIG } from "./score.config";

export class ScoreScene extends Scene {
  private score: number;
  private tapCounter: number;

  private background: TileSprite;

  private result: Text;
  private hint: Text;
  private hintText: string = "Touch to restart";

  private touchSound: Sound;

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
      this.buildHintText();
    }
  }

  create(): void {
    super.fadeInScene();
    this.buildSounds();
    this.buildBackground();
    this.buildResultText();
    this.addTouchEventToScreen();
  }

  private closeScene(): void {
    if (this.tapCounter >= 1) {
      this.touchSound.play();
      super.fadeOutScene(Scenes.Welcome);
    } else {
      this.tapCounter++;
    }
  }

  private addTouchEventToScreen(): void {
    this.input.on(
      "pointerdown",
      () => {
        this.closeScene();
      },
      this
    );
  }

  private buildResultText(): void {
    const resultText: string = "Your score is " + this.score;
    this.result = this.add.text(
      calculateHalfOfHalf(this.renderer.width) / 1.5,
      calculateHalfOfHalf(this.renderer.height) - 100,
      resultText,
      RESULT_TEXT_CONFIG
    );
  }

  private buildHintText(): void {
    this.hint = this.add.text(
      calculateHalfOfHalf(this.renderer.width) / 2,
      this.renderer.height - 100,
      this.hintText,
      HINT_TEXT_CONFIG
    );
  }

  private buildBackground(): void {
    this.background = this.add.tileSprite(
      0,
      this.renderer.height / 2,
      this.renderer.width * 2,
      this.renderer.height * 2,
      BACKGROUND_SECTION
    );
    this.background.setAngle(90);
  }

  private buildSounds(): void {
    this.touchSound = this.sound.add(WRONG_SOUND_SECTION, {
      volume: SOUND_EFFECTS_VOLUME,
    });
  }
}
