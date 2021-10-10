import { TextButton } from "../game-objects/text-button";
import { IMAGES, SCENES } from "./k-boom.routes";
import Phaser from "phaser";
import { TileSprite } from "../game-objects/tile-sprite";

const BUTTON_CONFIG = {
  font: "3rem Minecraft",
  color: "#BC00FF",
};

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.MENU,
    });
  }

  preload() {
    this.load.image("background-menu-2", IMAGES.get("background-menu-2"));
  }

  init() {}

  create() {
    const background: TileSprite = this.buildBackground();
    const playButton = this.buildTextButton("PLAY", 60, 0);
    const levelsButton = this.buildTextButton("LEVELS", 90, 100);
    const optionsButton = this.buildTextButton("OPTIONS", 105, 200);

    this.add.existing(background);
    this.add.existing(optionsButton);
    this.add.existing(playButton);
    this.add.existing(levelsButton);
    playButton.on("pointerdown", () => {
      this.sound.stopAll();
      this.scene.start(SCENES.GAME);
    });
    optionsButton.on("pointerdown", () => {
    });
  }

  private buildTextButton(
    text: string,
    xDifferenceFactor: number,
    yDifferneceFactor: number
  ): TextButton {
    return new TextButton(
      this,
      this.renderer.width / 2 - xDifferenceFactor,
      this.renderer.height / 3 + yDifferneceFactor,
      text,
      BUTTON_CONFIG
    );
  }

  private buildBackground(): TileSprite {
    return new TileSprite(
      this,
      this.renderer.width / 2,
      this.renderer.height / 2,
      this.renderer.width,
      this.renderer.height,
      "background-menu-2"
    );
  }
}
