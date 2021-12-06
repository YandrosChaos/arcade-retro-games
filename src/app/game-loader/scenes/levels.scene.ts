import Phaser, { Scenes } from "phaser";
import { Subscription } from "rxjs";
import { GAME_PRAY } from "src/app/commons/const/pray-name";
import {
  Level,
  VideoGame,
} from "src/app/commons/interfaces/game/videogame.interface";
import { Payload } from "src/app/commons/interfaces/HolyData/Payload";
import { HolyData } from "src/app/commons/services/holy-data/holy-data.service";
import { TextButton } from "../game-objects/text-button";
import { TileSprite } from "../game-objects/tile-sprite";
import { IMAGES, SCENES } from "./k-boom.routes";

const BUTTON_CONFIG: Phaser.Types.GameObjects.Text.TextStyle = {
  font: "3rem Minecraft",
  color: "#BC00FF",
};

export class LevelsScene extends Phaser.Scene {
  private background: TileSprite;
  private returnButton: TextButton;
  private levelsButtons: TextButton[];

  private subGame: Subscription;
  private videoGame: VideoGame;

  constructor() {
    super({ key: SCENES.LEVELS });
  }

  preload() {
    this.load.image("background-menu-2", IMAGES.get("background-menu-2"));

    this.subGame = HolyData.getPrayer(GAME_PRAY).subscribe(
      (gameData: Payload) => {
        if (gameData) this.videoGame = gameData.data;
      }
    );
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
    this.createReturnButton();
    this.createLevelsButtons();
  }

  private createReturnButton(): void {
    this.returnButton = new TextButton(this, 10, 10, "<", BUTTON_CONFIG);
  }

  private createLevelsButtons(): void {
    this.levelsButtons = [];
    this.videoGame.levels.forEach((level: Level, index: number) => {
      this.levelsButtons.push(
        this.buildTextButton(level.name, 90, 100 * index)
      );
    });
  }

  private addAllExisting(): void {
    this.add.existing(this.background);
    this.add.existing(this.returnButton);
    this.addLevelsButtons();
  }

  private addLevelsButtons(): void {
    this.levelsButtons.forEach((button: TextButton) =>
      this.add.existing(button)
    );
  }

  private addAllTouchEvents(): void {
    this.addReturnEvent();
    this.addGoToLevelEvent();
  }

  private addReturnEvent(): void {
    this.returnButton.on("pointerdown", () => {
      this.scene.start(SCENES.MENU);
    });
  }

  private addGoToLevelEvent(): void {
    this.levelsButtons.forEach((button: TextButton) => {
      button.on("pointerdown", () => {
        this.addHolyPray(button.text);
        this.sound.stopAll();
        this.scene.start(SCENES.GAME);
      });
    });
  }

  private addHolyPray(buttonText: string): void {
    const payload: Payload = {
      key: "selected-level",
      data: this.findTouchedLevel(buttonText),
    };
    HolyData.addPrayer(payload);
  }

  private findTouchedLevel(buttonText: string): Level {
    return this.videoGame.levels.find(
      (level: Level) => level.name === buttonText
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
      70 + yDifferneceFactor,
      text,
      BUTTON_CONFIG
    );
  }
}
