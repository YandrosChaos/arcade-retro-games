import Phaser from "phaser";
import { calculateHalfOfHalf } from "../../commons/functions/responsive.function";
import { platformHeight, platformWidth } from "../game-loader.page";
import { TileSprite } from "../game-objects/tile-sprite";
import { MENU_MUSIC_VOLUME, SOUND_EFFECTS_VOLUME } from "./k-boom.config";
import {
  BACKGROUND_MENU_IMG_PATH,
  BACKGROUND_MENU_SECTION_NAME,
  GAME_NAME,
  GAME_SCENE_NAME,
  MENU_MUSIC_PATH,
  MENU_MUSIC_SECTION_NAME,
  SCENES,
  START_SOUND_PATH,
  START_SOUND_SECTION_NAME,
  TEXT_BITMAP_FONT_PATH_FNT,
  TEXT_BITMAP_FONT_PATH_PNG,
  TEXT_FONT_NAME,
  TITLE_BITMAP_FONT_PATH_FNT,
  TITLE_BITMAP_FONT_PATH_PNG,
  TITLE_FONT_NAME,
  WELCOME_SCENE_NAME,
} from "./k-boom.routes";

export class WelcomeScene extends Phaser.Scene {
  private title: Phaser.GameObjects.BitmapText;
  private hint: Phaser.GameObjects.BitmapText;
  private hintText: string = "Touch!";

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
    this.load.bitmapFont(
      TITLE_FONT_NAME,
      TITLE_BITMAP_FONT_PATH_PNG,
      TITLE_BITMAP_FONT_PATH_FNT
    );
    this.load.bitmapFont(
      TEXT_FONT_NAME,
      TEXT_BITMAP_FONT_PATH_PNG,
      TEXT_BITMAP_FONT_PATH_FNT
    );
    this.load.image(BACKGROUND_MENU_SECTION_NAME, BACKGROUND_MENU_IMG_PATH);
  }

  create(): void {
    this.startGameSound = this.sound.add(START_SOUND_SECTION_NAME, {
      volume: SOUND_EFFECTS_VOLUME,
    });
    this.music = this.sound.add(MENU_MUSIC_SECTION_NAME, {
      volume: MENU_MUSIC_VOLUME,
      loop: true,
    });
    this.music.play();
    const background: TileSprite = this.buildBackground();
    this.add.existing(background);
    this.title = this.add.bitmapText(
      calculateHalfOfHalf(platformWidth) / 2.5,
      calculateHalfOfHalf(platformHeight) - 100,
      TITLE_FONT_NAME,
      GAME_NAME,
      platformWidth / 5
    );
    this.input.on(
      "pointerdown",
      function () {
        this.startGameSound.play();
        this.scene.start(SCENES.MENU);
      },
      this
    );
  }

  update(time: number): void {
    const seconds: number = Number((time / 1000).toFixed(0));
    this.hint?.destroy();
    if (seconds % 2 !== 0) {
      this.hint = this.add.bitmapText(
        calculateHalfOfHalf(platformWidth) + 50,
        platformHeight - 100,
        TEXT_FONT_NAME,
        this.hintText,
        platformWidth / 10
      );
    }
  }

  private buildBackground(): TileSprite {
    return new TileSprite(
      this,
      this.renderer.width / 2,
      this.renderer.height / 2,
      this.renderer.width,
      this.renderer.height,
      BACKGROUND_MENU_SECTION_NAME
    );
  }
}
