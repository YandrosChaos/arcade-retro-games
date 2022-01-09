import { Subscription } from "rxjs";
import { GAME_PRAY, MODAL_PRAY, SELECTED_LEVEL_PRAY } from "@const/pray-name";
import { VideoGame } from "@interfaces/game/videogame.class";
import { Level } from "@interfaces/game/videogame.interface";
import { Payload } from "@interfaces/HolyData/Payload";
import { User } from "@interfaces/user/user.class";
import { HolyData } from "@services/holy-data/holy-data.service";
import { UserService } from "@services/user/user.service";
import { Scene } from "@game-objects/scene";
import { TextButton } from "@game-objects/text-button";
import {
  BUTTON_CONFIG,
  LOCK_BUTTON_CONFIG,
  SECONDARY_BUTTON_CONFIG,
  SOUND_EFFECTS_VOLUME,
} from "@k-boom/config/k-boom.config";
import { Scenes } from "@k-boom/config/k-boom.names";
import {
  BONUS_SOUND_SECTION,
  WRONG_SOUND_SECTION,
} from "@k-boom/config/k-boom.section";
import { getSoundPath } from "@k-boom/functions/path.functions";
import { UnlockLevelModal } from "./modals/unlock-level/unlock-level.game-modal";
import { Sound } from "@game-objects/sound/sound.interface";
import { PointerEvent } from "@interfaces/events/events.interface";

export class LevelsScene extends Scene {
  private returnButton: TextButton;
  private pointsButton: TextButton;
  private levelButtons: TextButton[];

  private subUser: Subscription;
  private subGame: Subscription;
  private subModal: Subscription;

  private currentUser: User = new User();
  private videoGame: VideoGame = new VideoGame();

  constructor() {
    super(Scenes.Levels);
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
        if (gameData?.data) this.videoGame.assign({ ...gameData.data });
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

  create() {
    super.fadeInScene();
    this.createAllButtons();
    this.addAllExisting();
    this.addAllTouchEvents();
    this.inAllButtonAnimation();
    this.buildMainSoundEffects();
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
      -20,
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
    button.on(PointerEvent.Down, () => {
      this.allButtonsDisabled();
      const unlockLevelPanel: UnlockLevelModal = new UnlockLevelModal(
        this,
        level
      );
      unlockLevelPanel.show();
    });
  }

  private addPlayEvent(button: TextButton): void {
    button.on(PointerEvent.Down, () => {
      this.addHolyPray(button.text);
      this.sound.stopAll();
      this.touchSound.play();
      this.unsubscribeAll();
      this.outAllButtonAnimation();
      super.fadeOutScene(Scenes.Game);
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

  private inAllButtonAnimation(): void {
    super.animateItems(this.pointsButton, this.renderer.width - 150);
    super.animateItems(this.returnButton, 20);
  }

  private outAllButtonAnimation(): void {
    super.animateItems(this.pointsButton, 300);
    super.animateItems(this.returnButton, -20);
  }

  private addReturnEvent(): void {
    this.returnButton.on(PointerEvent.Down, () => {
      this.unsubscribeAll();
      this.cancelSound.play();
      this.outAllButtonAnimation();
      super.fadeOutScene(Scenes.Menu);
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
