import Phaser from "phaser";
import { TextButton } from "../game-objects/text-button";
import { TileSprite } from "../game-objects/tile-sprite";
import {
  BUTTON_CONFIG,
  MENU_MUSIC_VOLUME,
  SOUND_EFFECTS_VOLUME,
} from "./k-boom.config";
import {
  BACKGROUND_MENU_IMG_PATH,
  BACKGROUND_MENU_SECTION_NAME,
  MENU_MUSIC_PATH,
  MENU_MUSIC_SECTION_NAME,
  SCENES,
  START_SOUND_PATH,
  START_SOUND_SECTION_NAME,
  WELCOME_SCENE_NAME,
} from "./k-boom.routes";
export class WelcomeScene extends Phaser.Scene {
  private titleButton: TextButton;
  private touchButton: TextButton;

  private background: TileSprite;

  private music: Phaser.Sound.BaseSound;
  private startGameSound: Phaser.Sound.BaseSound;

  constructor() {
    super({
      key: WELCOME_SCENE_NAME,
    });
  }

  preload() {
    this.load.audio(MENU_MUSIC_SECTION_NAME, MENU_MUSIC_PATH);
    this.load.audio(START_SOUND_SECTION_NAME, START_SOUND_PATH);
    this.load.image(BACKGROUND_MENU_SECTION_NAME, BACKGROUND_MENU_IMG_PATH);
  }

  create(): void {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.buildAllElements();
    this.addAllExisting();
    this.music.play();
    this.onScreenTouchedEvent();
  }

  update(time: number): void {
    const seconds: number = Number((time / 1000).toFixed(0));
    this.touchButton?.destroy();
    if (seconds % 2 !== 0) {
      this.buildTouchButton();
      this.add.existing(this.touchButton);
    }
  }

  private onScreenTouchedEvent(): void {
    this.input.on(
      "pointerdown",
      function () {
        this.startGameSound.play();
        this.fadeOutScene();
      },
      this
    );
  }

  private fadeOutScene(): void {
    this.cameras.main.fadeOut(1000, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {this.scene.start(SCENES.MENU)});
  }

  private buildAllElements(): void {
    this.buildTitleButton();
    this.buildTouchButton();
    this.buildBackground();
    this.buildSound();
  }

  private addAllExisting(): void {
    this.add.existing(this.background);
    this.add.existing(this.titleButton);
    this.add.existing(this.touchButton);
  }

  private buildSound(): void {
    this.startGameSound = this.sound.add(START_SOUND_SECTION_NAME, {
      volume: SOUND_EFFECTS_VOLUME,
    });
    this.music = this.sound.add(MENU_MUSIC_SECTION_NAME, {
      volume: MENU_MUSIC_VOLUME,
      loop: true,
    });
  }

  private buildTitleButton(): void {
    this.titleButton = this.buildTextButton(
      "K-BOOM!",
      this.renderer.width / 10,
      this.renderer.height / 2 - 40,
      {
        font: "5rem Xenon",
        color: "black",
      }
    );
  }

  private buildTouchButton(): void {
    this.touchButton = this.buildTextButton(
      "Touch!",
      this.renderer.width / 2 - 75,
      this.renderer.height / 2 + 40,
      BUTTON_CONFIG
    );
  }

  private buildTextButton(
    text: string,
    x: number,
    y: number,
    config: Phaser.Types.GameObjects.Text.TextStyle
  ): TextButton {
    return new TextButton(this, x, y, text, config);
  }

  private buildBackground(): void {
    this.background = new TileSprite(
      this,
      this.renderer.width / 2,
      this.renderer.height / 2,
      this.renderer.width,
      this.renderer.height,
      BACKGROUND_MENU_SECTION_NAME
    );
  }
}
