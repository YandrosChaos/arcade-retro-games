import Phaser, { Scene } from "phaser";
import { Level } from "src/app/commons/interfaces/game/level.class";
import { Level as LevelInterface } from "src/app/commons/interfaces/game/videogame.interface";
import { HolyData } from "src/app/commons/services/holy-data/holy-data.service";
import { TextButton } from "../../../../game-objects/text-button";
import {
  BUTTON_CONFIG,
  LOCK_SECONDARY_BUTTON_CONFIG,
  SECONDARY_BUTTON_CONFIG,
  SOUND_EFFECTS_VOLUME,
  TERTIARY_BUTTON_CONFIG,
} from "../../config/k-boom.config";
import { BACKGROUND_CONF } from "./unlock-level.config";
import { GAME_PRAY, MODAL_PRAY } from "../../../../../commons/const/pray-name";
import { Subscription } from "rxjs";
import { User } from "src/app/commons/interfaces/user/user.interface";
import { UserService } from "src/app/commons/services/user/user.service";
import { VideoGame } from "src/app/commons/interfaces/game/videogame.class";
import { Payload } from "src/app/commons/interfaces/HolyData/Payload";
import {
  BONUS_SOUND_SECTION,
  WRONG_SOUND_SECTION,
} from "../../config/k-boom.section";

export class UnlockLevelModal {
  private subUser: Subscription;
  private subVideoGame: Subscription;

  private user: User;
  private userCanPay: boolean;

  private scene: Scene;
  private container!: Phaser.GameObjects.Container;

  private background: Phaser.GameObjects.Graphics;
  private unlockText: TextButton;
  private pointCostText: TextButton;
  private confirmButton: TextButton;
  private cancelButton: TextButton;

  private successSound: Phaser.Sound.BaseSound;
  private wrongSound: Phaser.Sound.BaseSound;

  private videogame: VideoGame = new VideoGame();
  private level: Level = new Level();

  constructor(scene: Scene, level: LevelInterface) {
    this.level.assign(level);
    this.scene = scene;
    this.container = scene.add.container(this.scene.scale.width + 300, 0);
    this.background = scene.add.graphics(BACKGROUND_CONF);

    this.background.fillRect(0, 0, scene.scale.width, scene.scale.height);
    this.container.add(this.background);
    this.container;

    this.buildSounds();
  }

  public show(): void {
    this.initAllSubscriptions();
    this.scene.add.tween({
      targets: this.container,
      x: 10,
      duration: 300,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
  }

  public hide(): void {
    this.killAllSubscriptions();
    HolyData.updatePrayer({ key: MODAL_PRAY, data: true });
    this.scene.add.tween({
      targets: this.container,
      x: this.scene.scale.width + 300,
      duration: 300,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
  }

  private initAllSubscriptions(): void {
    this.subUser = UserService.getCurrent().subscribe((user: User) => {
      this.user = user;
      this.canPay();
      this.setupButtons();
      this.addButtonEvents();
      this.addButtons();
    });

    this.subVideoGame = HolyData.getPrayer(GAME_PRAY).subscribe(
      (payload: Payload) => {
        console.log(payload);
        if (payload?.data) this.videogame.assign({ ...payload.data });
      }
    );
  }

  private killAllSubscriptions(): void {
    this.subUser.unsubscribe();
    this.subVideoGame.unsubscribe();
  }

  private setupButtons(): void {
    this.unlockText = this.createButton(
      165,
      0,
      "Unlock LVL " + this.level.name[this.level.name.length - 1]
    );
    this.pointCostText = this.createButton(
      90,
      100,
      this.level.formattedPoints()
    ).setOrigin(0, 0);
    this.confirmButton = this.createButton(
      60,
      150,
      "Pay",
      this.buttonStyle()
    ).setOrigin(1, 0);
    this.cancelButton = this.createButton(
      35,
      150,
      "Nah",
      TERTIARY_BUTTON_CONFIG
    ).setOrigin(-1, 0);
  }

  private addButtons(): void {
    this.container.add(this.unlockText);
    this.container.add(this.pointCostText);
    this.container.add(this.confirmButton);
    this.container.add(this.cancelButton);
  }

  private addButtonEvents(): void {
    if (this.userCanPay) {
      this.confirmButton.on("pointerdown", () => {
        UserService.diffPoints(this.level.unlockPoints);
        this.successSound.play();
        this.unlockLevel();
        this.hide();
      });
    }
    this.cancelButton.on("pointerdown", () => {
      this.wrongSound.play();
      this.hide();
    });
  }

  private unlockLevel(): void {
    this.videogame.unlockLevel(this.level.name);
    HolyData.updatePrayer({ key: GAME_PRAY, data: this.videogame });
  }

  private createButton(
    xDifferenciator: number,
    yDifferenciator: number,
    text: string,
    style: Phaser.Types.GameObjects.Text.TextStyle = BUTTON_CONFIG
  ): TextButton {
    return new TextButton(
      this.scene,
      this.scene.scale.width / 2 - xDifferenciator,
      this.scene.scale.height / 3 + yDifferenciator,
      text,
      style
    );
  }

  private buttonStyle(): Phaser.Types.GameObjects.Text.TextStyle {
    switch (this.userCanPay) {
      case true:
        return SECONDARY_BUTTON_CONFIG;
      case false:
        return LOCK_SECONDARY_BUTTON_CONFIG;
    }
  }

  private canPay(): void {
    this.userCanPay = this.user.points >= this.level.unlockPoints;
  }

  private buildSounds(): void {
    this.successSound = this.scene.sound.add(BONUS_SOUND_SECTION, {
      volume: SOUND_EFFECTS_VOLUME,
    });

    this.wrongSound = this.scene.sound.add(WRONG_SOUND_SECTION, {
      volume: SOUND_EFFECTS_VOLUME,
    });
  }
}
