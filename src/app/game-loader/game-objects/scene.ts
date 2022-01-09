import { EXIT_PRAY } from "@const/pray-name";
import { SOUND_EFFECTS_VOLUME } from "@game-scenes/k-boom/config/k-boom.config";
import {
  MENU_MUSIC_SECTION,
  START_SOUND_SECTION,
  BACKGROUND_MENU_SECTION,
  BACKGROUND_SECTION,
  WRONG_SOUND_SECTION,
  BONUS_SOUND_SECTION,
} from "@game-scenes/k-boom/config/k-boom.section";
import {
  getMusicPath,
  getSoundPath,
  getImgPath,
} from "@game-scenes/k-boom/functions/path.functions";
import { Sound } from "@game-objects/sound/sound.interface";
import { HolyData } from "@services/holy-data/holy-data.service";

export class Scene extends Phaser.Scene {
  protected touchSound?: Sound;
  protected confirmSound?: Sound;
  protected cancelSound?: Sound;

  constructor(sceneKey: string) {
    super({ key: sceneKey });
  }

  public preload(): void {
    this.load.audio(BONUS_SOUND_SECTION, getSoundPath(BONUS_SOUND_SECTION));
    this.load.audio(WRONG_SOUND_SECTION, getSoundPath(WRONG_SOUND_SECTION));
    this.load.audio(MENU_MUSIC_SECTION, getMusicPath(MENU_MUSIC_SECTION));
    this.load.audio(START_SOUND_SECTION, getSoundPath(START_SOUND_SECTION));
    this.load.image(BACKGROUND_SECTION, getImgPath(BACKGROUND_SECTION));
    this.load.image(
      BACKGROUND_MENU_SECTION,
      getImgPath(BACKGROUND_MENU_SECTION)
    );
  }

  public init(params: any): void {}

  public create(): void {}

  public update(time: number): void {}

  protected fadeInScene(): void {
    this.cameras.main.fadeIn(250, 0, 0, 0);
  }

  protected fadeOutScene(nextScene: string, param?: object): void {
    this.cameras.main.fadeOut(250, 0, 0, 0);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (cam, effect) => {
        this.scene.start(nextScene, param || {});
      }
    );
  }

  protected runScene(sceneKey: string): void {
    this.scene.start(sceneKey);
  }

  protected killGame(): void {
    this.cameras.main.fadeOut(250, 0, 0, 0);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (cam, effect) => {
        HolyData.updatePrayer({ key: EXIT_PRAY, data: "exit" });
      }
    );
  }

  protected animateItems(
    targets: any,
    x: number,
    duration: number = 300
  ): void {
    this.add.tween({
      targets: targets,
      x: x,
      duration: duration,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
  }

  protected buildMainSoundEffects(): void {
    this.touchSound = this.sound?.add(BONUS_SOUND_SECTION, {
      volume: SOUND_EFFECTS_VOLUME,
    });
    this.confirmSound = this.sound.add(START_SOUND_SECTION, {
      volume: SOUND_EFFECTS_VOLUME,
    });
    this.cancelSound = this.sound.add(WRONG_SOUND_SECTION, {
      volume: SOUND_EFFECTS_VOLUME,
    });
  }
}
