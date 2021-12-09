import Phaser from "phaser";
import { Subscription } from "rxjs";
import { GAME_PRAY } from "src/app/commons/const/pray-name";
import {
  Level,
  VideoGame,
} from "src/app/commons/interfaces/game/videogame.interface";
import { Payload } from "src/app/commons/interfaces/HolyData/Payload";
import { User } from "src/app/commons/interfaces/user/user.class";
import { HolyData } from "src/app/commons/services/holy-data/holy-data.service";
import { UserService } from "src/app/commons/services/user/user.service";
import UnlockLevelModal from "../game-modals/unlock-level.game-modal";
import { TextButton } from "../game-objects/text-button";
import {
  BUTTON_CONFIG,
  LOCK_BUTTON_CONFIG,
  SECONDARY_BUTTON_CONFIG,
} from "./k-boom.config";
import { SCENES } from "./k-boom.routes";

export class LevelsScene extends Phaser.Scene {
  private returnButton: TextButton;
  private pointsButton: TextButton;

  private subUser: Subscription;
  private subGame: Subscription;

  private currentUser: User = new User();
  private videoGame: VideoGame;

  constructor() {
    super({ key: SCENES.LEVELS });
  }

  init(params) {
    this.subUser = UserService.getCurrent().subscribe((user) =>
      this.currentUser.assign(user)
    );

    this.subGame = HolyData.getPrayer(GAME_PRAY).subscribe(
      (gameData: Payload) => {
        if (gameData) this.videoGame = gameData.data;
      }
    );
  }

  preload() {}

  create() {
    this.createAllButtons();
    this.addAllExisting();
    this.addAllTouchEvents();
  }

  private createAllButtons(): void {
    this.createPointsButton();
    this.createReturnButton();
    this.createLevelsButtons();
  }

  private createPointsButton(): void {
    this.pointsButton = new TextButton(
      this,
      this.renderer.width - 150,
      10,
      this.currentUser.formattedPoints(),
      SECONDARY_BUTTON_CONFIG
    );
  }

  private createReturnButton(): void {
    this.returnButton = new TextButton(
      this,
      20,
      10,
      "<",
      SECONDARY_BUTTON_CONFIG
    );
  }

  private createLevelsButtons(): void {
    this.videoGame.levels.forEach((level: Level, index: number) => {
      const button: TextButton = this.buildTextButton(level, 90, 100 * index);
      if (!level.unlocked) this.addUnlockEvent(button, level);
      else this.addPlayEvent(button);
      this.add.existing(button);
    });
  }

  private addUnlockEvent(button: TextButton, level: Level): void {
    button.on("pointerdown", () => {
      const unlockLevelPanel: UnlockLevelModal = new UnlockLevelModal(
        this,
        level
      );
      unlockLevelPanel.show();
    });
  }

  private addPlayEvent(button: TextButton): void {
    button.on("pointerdown", () => {
      this.addHolyPray(button.text);
      this.sound.stopAll();
      this.unsubscribeAll();
      this.scene.start(SCENES.GAME);
    });
  }

  private addAllExisting(): void {
    this.add.existing(this.returnButton);
    this.add.existing(this.pointsButton);
  }

  private addAllTouchEvents(): void {
    this.addReturnEvent();
  }

  private addReturnEvent(): void {
    this.returnButton.on("pointerdown", () => {
      this.unsubscribeAll();
      this.scene.start(SCENES.MENU);
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

  private unsubscribeAll(): void {
    this.subUser.unsubscribe();
    this.subGame.unsubscribe();
  }
}
