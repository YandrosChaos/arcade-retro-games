import Phaser from "phaser";
import { Scene } from "@game-objects/scene";
import { Scenes } from "@k-boom/config/k-boom.names";
import {
  IMAGES,
  IMG_MAIN_PATH,
  MUSIC,
  MUSIC_MAIN_PATH,
  SOUNDS,
  SOUNDS_MAIN_PATH,
  SPRITES,
  SPRITES_MAIN_PATH,
  SVGS,
  SVG_MAIN_PATH,
} from "@k-boom/config/k-boom.routes";
export class LoadScene extends Scene {
  constructor() {
    super(Scenes.Load);
  }

  init() {}

  preload() {
    this.loadMusic();
    this.loadSounds();
    this.loadSprites();
    this.loadImages();
    this.loadSVG();
    this.initLoadingBar();
  }

  private initLoadingBar(): void {
    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xbc00ff,
      },
    });

    this.load.on("progress", (percent: number) => {
      loadingBar.fillRect(
        this.renderer.width / 2 - 25,
        0,
        50,
        this.renderer.height * percent
      );
    });

    this.load.on("complete", () => {});
    this.load.on("load", (file: Phaser.Loader.File) => {});
  }

  private loadImages(): void {
    this.load.setPath(IMG_MAIN_PATH);
    IMAGES.forEach((value: string, key: string) => {
      this.load.image(key, value);
    });
  }

  private loadSVG(): void {
    this.load.setPath(SVG_MAIN_PATH);
    SVGS.forEach((value: string, key: string) => {
      this.load.image(key, value);
    });
  }

  private loadMusic(): void {
    this.load.setPath(MUSIC_MAIN_PATH);
    MUSIC.forEach((value: string, key: string) => {
      this.load.image(key, value);
    });
  }

  private loadSounds(): void {
    this.load.setPath(SOUNDS_MAIN_PATH);
    SOUNDS.forEach((value: string, key: string) => {
      this.load.image(key, value);
    });
  }

  private loadSprites(): void {
    this.load.setPath(SPRITES_MAIN_PATH);
    SPRITES.forEach((value: string, key: string) => {
      this.load.spritesheet(key, value, {
        frameWidth: 128,
        frameHeight: 128,
      });
    });
  }

  create() {
    super.fadeOutScene(Scenes.Welcome);
  }
}
