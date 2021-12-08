import { TextButton } from "../game-objects/text-button";
import { IMAGES, SCENES } from "./k-boom.routes";
import Phaser from "phaser";
import { TileSprite } from "../game-objects/tile-sprite";
import { HolyData } from "src/app/commons/services/holy-data/holy-data.service";
import { EXIT_PRAY } from "src/app/commons/const/pray-name";
import { BUTTON_CONFIG, TITLE_BUTTON_CONFIG } from "./k-boom.config";
2;
const NUMBER_OF_BUTTONS: number = 3;
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
    const titleButton = this.buildTitleButton();
    const playButton = this.buildTextButton("PLAY", 60, 0);
    const levelsButton = this.buildTextButton("LEVELS", 90, 100);
    const exitButton = this.buildTextButton("EXIT", 60, 200);

    this.add.existing(background);
    this.add.existing(titleButton);
    this.add.existing(playButton);
    this.add.existing(levelsButton);
    this.add.existing(exitButton);
    playButton.on("pointerdown", () => {
      this.sound.stopAll();
      this.scene.start(SCENES.GAME);
    });
    levelsButton.on("pointerdown", () => {
      this.scene.start(SCENES.LEVELS);
    });
    exitButton.on("pointerdown", () => {
      HolyData.updatePrayer({ key: EXIT_PRAY, data: "exit" });
    });
  }

  private buildTitleButton(): TextButton {
    return new TextButton(
      this,
      this.renderer.width / 10,
      this.renderer.height - (this.renderer.height - 40),
      "K-BOOM!",
      TITLE_BUTTON_CONFIG
    );
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
