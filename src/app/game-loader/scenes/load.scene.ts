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
    IMAGES.forEach((value: string, key: string) => {
      this.load.image(key, value);
    });
  }

  private loadAudio(): void {
    this.load.setPath(RESOURCES_PATH);
    SOUNDS.forEach((value: string, key: string) => {
      this.load.image(key, value);
    });
  }

  private loadSprites(): void {
    this.load.setPath(RESOURCES_PATH);
    SPRITES.forEach((value: string, key: string) => {
      this.load.spritesheet(key, value, {
        frameWidth: 128,
        frameHeight: 128,
      });
    });
  }

  create() {
    this.fadeInScene();
    this.fadeOutScene();
  }

  private fadeInScene():void{
    this.cameras.main.fadeIn(1000, 0, 0 , 0);
  }

  private fadeOutScene():void{
    this.cameras.main.fadeOut(1000, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => { this.scene.start(SCENES.WELCOME)});
  }
  
}
