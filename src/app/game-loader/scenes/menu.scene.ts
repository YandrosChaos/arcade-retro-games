import { TextButton } from "../game-objects/text-button";
import { IMAGES, SCENES } from "./k-boom.routes";
import Phaser from "phaser";
import { TileSprite } from "../game-objects/tile-sprite";
import { HolyData } from "src/app/commons/functions/reader.functions";

const BUTTON_CONFIG = {
  font: "3rem Minecraft",
  color: "#BC00FF",
};

const NUMBER_OF_BUTTONS: number = 4;
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
    const exitButton = this.buildTextButton("EXIT", 60, 300);

    this.add.existing(background);
    this.add.existing(optionsButton);
    this.add.existing(playButton);
    this.add.existing(levelsButton);
    this.add.existing(exitButton);
    playButton.on("pointerdown", () => {
      this.sound.stopAll();
      this.scene.start(SCENES.GAME);
    });
    exitButton.on("pointerdown", () => {
      HolyData.addPrayer("exit");
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
      this.renderer.height / NUMBER_OF_BUTTONS + yDifferneceFactor,
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
