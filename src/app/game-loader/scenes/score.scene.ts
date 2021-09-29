import Phaser from 'phaser';
import { platformHeight, platformWidth } from '../game-loader.page';
import {
  BACKGROUND_IMG_PATH,
  BACKGROUND_SECTION_NAME,
  SCORE_SCENE_NAME,
  WELCOME_SCENE_NAME,
} from './k-boom.routes';

export class ScoreScene extends Phaser.Scene {
  private score: number;
  private result: Phaser.GameObjects.Text;
  private hint: Phaser.GameObjects.Text;
  private hintText: string = 'Touch to restart';

  constructor() {
    super({
      key: SCORE_SCENE_NAME,
    });
  }

  init(params: any): void {
    this.score = params.bombsCaught;
  }

  preload() {
    this.load.image(BACKGROUND_SECTION_NAME, BACKGROUND_IMG_PATH);
  }

  update(time: number): void {
    const seconds: number = Number((time / 1000).toFixed(0));
    this.hint?.destroy();
    if (seconds % 2 !== 0) {
      this.hint = this.add.text(
        this.calculateHalfOfHalf(platformWidth),
        this.calculateHalfOfHalf(platformHeight) + 75,
        this.hintText,
        {
          font: '2rem Arial Bold',
          color: '#BC00FF',
        }
      );
    }
  }

  create(): void {
    const background: Phaser.GameObjects.TileSprite = this.add.tileSprite(
      0,
      platformHeight / 2,
      platformWidth * 2,
      platformHeight * 2,
      BACKGROUND_SECTION_NAME
    );
    background.setAngle(90);
    const resultText: string = 'Your score is ' + this.score;
    this.result = this.add.text(
      this.calculateHalfOfHalf(platformWidth),
      this.calculateHalfOfHalf(platformHeight) - 50,
      resultText,
      {
        font: '2rem Arial Bold',
        color: '#FBFBAC',
      }
    );
    this.input.on(
      'pointerdown',
      function (/*pointer*/) {
        this.scene.start(WELCOME_SCENE_NAME);
      },
      this
    );
  }

  private calculateHalfOfHalf(input: number): number {
    const half: number = input / 2;
    return half / 2;
  }
}
