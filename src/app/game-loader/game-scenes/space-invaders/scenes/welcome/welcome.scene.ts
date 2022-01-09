import { Scene } from "@game-objects/scene";
import { TextButton } from "@game-objects/text-button";
import { TileSprite } from "@game-objects/tile-sprite";
import { BUTTON_CONFIG, MENU_MUSIC_VOLUME } from "@space-invaders/config/global-config";
import { Scenes } from "@space-invaders/config/names";
import { getMusicPath } from "@space-invaders/functions/path.functions";
import { Sound } from "@game-objects/sound/sound.interface";
import { KBOOM_TEXT, TITLE_BUTTON_CONFIG, TOUCH_TEXT } from "./welcome.config";
import { TextStyle } from "@game-objects/text/text.interface";
import { PointerEvent } from "@interfaces/events/events.interface";
import { BACKGROUND_MENU_SECTION, MENU_MUSIC_SECTION } from "@game-scenes/space-invaders/config/section";
export class WelcomeScene extends Scene {
  private titleButton: TextButton;
  private touchButton: TextButton;

  private background: TileSprite;

  private music: Sound;

  constructor() {
    super(Scenes.Welcome);
  }

  preload() {
    super.preload();
    this.load.audio(MENU_MUSIC_SECTION, getMusicPath(MENU_MUSIC_SECTION));
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
    if (seconds % 2 !== 0) this.buildTouchButton();
  }

  private onScreenTouchedEvent(): void {
    this.input.on(
      PointerEvent.Down,
      () => {
        this.confirmSound.play();
        //super.fadeOutScene(Scenes.Menu);
      },
      this
    );
  }

  private buildAllElements(): void {
    this.buildTitleButton();
    this.buildTouchButton();
    this.buildBackground();
    this.buildMusic();
    this.buildMainSoundEffects();
  }

  private addAllExisting(): void {
    this.add.existing(this.background);
    this.add.existing(this.titleButton);
    this.add.existing(this.touchButton);
  }

  private buildMusic(): void {
    this.music = this.sound.add(MENU_MUSIC_SECTION, {
      volume: MENU_MUSIC_VOLUME,
      loop: true,
    });
  }

  private buildTitleButton(): void {
    this.titleButton = this.buildTextButton(
      KBOOM_TEXT,
      this.renderer.width / 10,
      this.renderer.height / 2 - 195,
      TITLE_BUTTON_CONFIG
    );
  }

  private buildTouchButton(): void {
    this.touchButton = this.buildTextButton(
      TOUCH_TEXT,
      this.renderer.width / 2 - 75,
      this.renderer.height / 2 + 40,
      BUTTON_CONFIG
    );
    this.add.existing(this.touchButton);
  }

  private buildTextButton(
    text: string,
    x: number,
    y: number,
    config: TextStyle
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
