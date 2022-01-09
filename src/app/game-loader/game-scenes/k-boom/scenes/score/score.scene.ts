import { calculateHalfOfHalf } from "@functions/responsive.function";
import { UserService } from "@services/user/user.service";
import { Scene } from "@game-objects/scene";
import { Scenes } from "@k-boom/config/k-boom.names";
import {
  BACKGROUND_SECTION,
} from "@k-boom/config/k-boom.section";
import { Text } from "@game-objects/text/text.interface";
import { TileSprite } from "@game-objects/tile-sprite";
import { HINT_TEXT_CONFIG, RESULT_TEXT_CONFIG } from "./score.config";
import { PointerEvent } from "@interfaces/events/events.interface";

export class ScoreScene extends Scene {
  private score: number;
  private tapCounter: number;

  private background: TileSprite;

  private result: Text;
  private hint: Text;
  private hintText: string = "Touch to restart";

  constructor() {
    super(Scenes.Score);
  }

  init(params: any): void {
    this.tapCounter = 0;
    this.score = params.bombsCaught;
    UserService.sumPoints(this.score);
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
    super.buildMainSoundEffects();
    this.buildBackground();
    this.buildResultText();
    this.addTouchEventToScreen();
  }

  private closeScene(): void {
    if (this.tapCounter >= 1) {
      this.cancelSound.play();
      super.fadeOutScene(Scenes.Welcome);
    } else {
      this.tapCounter++;
    }
  }

  private addTouchEventToScreen(): void {
    this.input.on(
      PointerEvent.Down,
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
}
