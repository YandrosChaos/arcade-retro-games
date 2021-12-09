import Phaser from "phaser";
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
import { LOCK_BUTTON_CONFIG } from "./k-boom.config";
import { IMAGES, SCENES } from "./k-boom.routes";

const BUTTON_CONFIG: Phaser.Types.GameObjects.Text.TextStyle = {
  font: "3rem Minecraft",
  color: "#BC00FF",
};

export class LevelsScene extends Phaser.Scene {
  private returnButton: TextButton;
  private levelsButtons: TextButton[];

  private subGame: Subscription;
  private videoGame: VideoGame;

  constructor() {
    super({ key: SCENES.LEVELS });
  }

  preload() {
    this.subGame = HolyData.getPrayer(GAME_PRAY).subscribe(
      (gameData: Payload) => {
        if (gameData) this.videoGame = gameData.data;
      }
    );
  }

  init() {}

  create() {
    this.createAllButtons();
    this.addAllExisting();
    this.addAllTouchEvents();
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
      this.levelsButtons.push(this.buildTextButton(level, 90, 100 * index));
    });
  }

  private addAllExisting(): void {
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
    level: Level,
    xDifferenceFactor: number,
    yDifferneceFactor: number
  ): TextButton {
    return new TextButton(
      this,
      this.renderer.width / 2 - xDifferenceFactor,
      70 + yDifferneceFactor,
      level.name,
      this.getLevelStyles(level)
    );
  }

  private getLevelStyles(level: Level) {
    switch (level.unlocked) {
      case true:
        return BUTTON_CONFIG;
      case false:
        return LOCK_BUTTON_CONFIG;
    }
  }
}
