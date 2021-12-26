import Phaser from "phaser";
import { Scene } from "../../../game-objects/scene";
import { TextButton } from "../../../game-objects/text-button";
import { TileSprite } from "../../../game-objects/tile-sprite";
import {
  BUTTON_CONFIG,
  MENU_MUSIC_VOLUME,
  SOUND_EFFECTS_VOLUME,
} from "../config/k-boom.config";
import { Scenes } from "../config/k-boom.names";
import {
  BACKGROUND_MENU_SECTION,
  MENU_MUSIC_SECTION,
  START_SOUND_SECTION,
} from "../config/k-boom.section";
import {
  getImgPath,
  getMusicPath,
  getSoundPath,
} from "../functions/path.functions";
export class WelcomeScene extends Scene {
  private titleButton: TextButton;
  private touchButton: TextButton;

  private background: TileSprite;

  private music: Phaser.Sound.BaseSound;
  private startGameSound: Phaser.Sound.BaseSound;

  constructor() {
    super(Scenes.Welcome);
  }

  preload() {
    this.load.audio(MENU_MUSIC_SECTION, getMusicPath(MENU_MUSIC_SECTION));
    this.load.audio(START_SOUND_SECTION, getSoundPath(START_SOUND_SECTION));
    this.load.image(
      BACKGROUND_MENU_SECTION,
      getImgPath(BACKGROUND_MENU_SECTION)
    );
  }

  create(): void {
    this.fadeInScene();
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
      () => {
        this.startGameSound.play();
        super.fadeOutScene(Scenes.Menu);
      },
      this
    );
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
    this.startGameSound = this.sound.add(START_SOUND_SECTION, {
      volume: SOUND_EFFECTS_VOLUME,
    });
    this.music = this.sound.add(MENU_MUSIC_SECTION, {
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
      BACKGROUND_MENU_SECTION
    );
  }
}
