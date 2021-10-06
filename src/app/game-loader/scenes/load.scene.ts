import Phaser from "phaser";
import {
  IMAGES,
  LOAD_SCENE_NAME,
  SCENES,
  SOUNDS,
  SPRITES,
} from "./k-boom.routes";

const RESOURCES_PATH: string = "assets/games/k-boom";

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: LOAD_SCENE_NAME });
  }

  init() {}

  preload() {
    this.loadAudio();
    this.loadSprites();
    this.loadImages();
    this.initLoadingBar();
  }

  private initLoadingBar(): void {
    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff, //white
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
    this.load.setPath(RESOURCES_PATH);
    IMAGES.forEach((key: string, value: string) => {
      this.load.image(key, value);
    });
  }

  private loadAudio(): void {
    this.load.setPath(RESOURCES_PATH);
    SOUNDS.forEach((key: string, value: string) => {
      this.load.image(key, value);
    });
  }

  private loadSprites(): void {
    this.load.setPath(RESOURCES_PATH);
    SPRITES.forEach((key: string, value: string) => {
      this.load.spritesheet(key, value);
    });
  }

  create() {
    this.scene.start(SCENES.WELCOME);
  }
}
