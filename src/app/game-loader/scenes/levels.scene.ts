import Phaser from "phaser";
import { TextButton } from "../game-objects/text-button";
import { TileSprite } from "../game-objects/tile-sprite";
import { IMAGES, SCENES } from "./k-boom.routes";

const NUMBER_OF_BUTTONS: number = 2;
const BUTTON_CONFIG: Phaser.Types.GameObjects.Text.TextStyle = {
  font: "3rem Minecraft",
  color: "#BC00FF",
};

export class LevelsScene extends Phaser.Scene {
  private background: TileSprite;
  private returnButton: TextButton;

  constructor() {
    super({ key: SCENES.LEVELS });
  }

  preload() {
    this.load.image("background-menu-2", IMAGES.get("background-menu-2"));
  }

  init() {}

  create() {
    this.createBackground();
    this.createAllButtons();
    this.addAllExisting();
    this.addAllTouchEvents();
  }

  private createBackground(): void {
    this.background = new TileSprite(
      this,
      this.renderer.width / 2,
      this.renderer.height / 2,
      this.renderer.width,
      this.renderer.height,
      "background-menu-2"
    );
  }

  private createAllButtons(): void {
    this.returnButton = this.buildTextButton("RETURN", 100, 0);
  }

  private addAllExisting(): void {
    this.add.existing(this.background);
    this.add.existing(this.returnButton);
  }

  private addAllTouchEvents(): void {
    this.returnButton.on("pointerdown", () => {
      this.scene.start(SCENES.MENU);
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
}
