import Phaser from "phaser";
import { Subscription } from "rxjs";
import {
  GAME_PRAY,
  MODAL_PRAY,
  SELECTED_LEVEL_PRAY,
} from "src/app/commons/const/pray-name";
import { VideoGame } from "src/app/commons/interfaces/game/videogame.class";
import { Level } from "src/app/commons/interfaces/game/videogame.interface";
import { Payload } from "src/app/commons/interfaces/HolyData/Payload";
import { User } from "src/app/commons/interfaces/user/user.class";
import { HolyData } from "src/app/commons/services/holy-data/holy-data.service";
import { UserService } from "src/app/commons/services/user/user.service";
import UnlockLevelModal from "../game-modals/unlock-level.game-modal";
import { Scene } from "../game-objects/scene";
import { TextButton } from "../game-objects/text-button";
import {
  BUTTON_CONFIG,
  LOCK_BUTTON_CONFIG,
  SECONDARY_BUTTON_CONFIG,
  SOUND_EFFECTS_VOLUME,
} from "./k-boom.config";
import {
  SCENES,
  START_SOUND_PATH,
  START_SOUND_SECTION_NAME,
} from "./k-boom.routes";

export class LevelsScene extends Scene {
  private returnButton: TextButton;
  private pointsButton: TextButton;
  private levelButtons: TextButton[];

  private subUser: Subscription;
  private subGame: Subscription;
  private subModal: Subscription;

  private currentUser: User = new User();
  private videoGame: VideoGame = new VideoGame();

  private touchedSound: Phaser.Sound.BaseSound;

  constructor() {
    super(SCENES.LEVELS);
  }

  init(params) {
    HolyData.updatePrayer({ key: MODAL_PRAY, data: false });
    this.initAllSubscriptions();
  }

  private initAllSubscriptions(): void {
    this.subUser = UserService.getCurrent().subscribe((user) =>
      this.currentUser.assign(user)
    );

    this.subGame = HolyData.getPrayer(GAME_PRAY).subscribe(
      (gameData: Payload) => {
        if (gameData?.data) this.videoGame.assign(gameData.data);
      }
    );
    this.subModal = HolyData.getPrayer(MODAL_PRAY).subscribe(
      (modalStatus: Payload) => this.onModal(modalStatus?.data)
    );
  }

  private onModal(status: boolean): void {
    if (status) {
      this.returnButton.setInteractive();
      this.pointsButton.destroy();
      this.destroyAllLevelButtons();
      this.createPointsButton(this.renderer.width - 150);
      this.add.existing(this.pointsButton);
      this.createAllLevelButtons();
    }
  }

  preload() {
    this.load.audio(START_SOUND_SECTION_NAME, START_SOUND_PATH);
  }

  create() {
    super.fadeInScene();
    this.createAllButtons();
    this.addAllExisting();
    this.addAllTouchEvents();
    this.pointsButtonAnimations();
    this.buildSounds();
  }

  private createAllButtons(): void {
    this.createPointsButton(300);
    this.createReturnButton();
    this.createAllLevelButtons();
  }

  private createPointsButton(x: number): void {
    this.pointsButton = new TextButton(
      this,
      x,
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

  private createAllLevelButtons(): void {
    this.levelButtons = [];
    this.videoGame.levels.forEach((level: Level, index: number) => {
      const button: TextButton = this.buildTextButton(level, 90, 100 * index);
      if (!level.unlocked) this.addUnlockEvent(button, level);
      else this.addPlayEvent(button);
      this.add.existing(button);
      this.levelButtons.push(button);
    });
  }

  private addUnlockEvent(button: TextButton, level: Level): void {
    button.on("pointerdown", () => {
      this.allButtonsDisabled();
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
      this.touchedSound.play();
      this.unsubscribeAll();
      super.fadeOutScene(SCENES.GAME);
    });
  }

  private allButtonsDisabled(): void {
    this.returnButton.disableInteractive();
    this.levelButtons.forEach((button: TextButton) =>
      button.disableInteractive()
    );
  }

  private destroyAllLevelButtons(): void {
    this.levelButtons.forEach((button: TextButton) => button.destroy());
  }

  private addAllExisting(): void {
    this.add.existing(this.returnButton);
    this.add.existing(this.pointsButton);
  }

  private addAllTouchEvents(): void {
    this.addReturnEvent();
  }

  private pointsButtonAnimations(): void {
    super.animateItems(this.pointsButton, this.renderer.width - 150);
  }

  private addReturnEvent(): void {
    this.returnButton.on("pointerdown", () => {
      this.unsubscribeAll();
      this.touchedSound.play();
      super.fadeOutScene(SCENES.MENU);
    });
  }

  private addHolyPray(buttonText: string): void {
    const payload: Payload = {
      key: SELECTED_LEVEL_PRAY,
      data: this.videoGame.findLevelByName(buttonText),
    };
    HolyData.addPrayer(payload);
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

  private buildSounds(): void {
    this.touchedSound = this.sound.add(START_SOUND_SECTION_NAME, {
      volume: SOUND_EFFECTS_VOLUME,
    });
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
    this.subModal.unsubscribe();
  }
}
