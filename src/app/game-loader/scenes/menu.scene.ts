import { TextButton } from "../game-objects/text-button";
import { SCENES } from "./k-boom.routes";
import {
  BUTTON_CONFIG,
  TERTIARY_BUTTON_CONFIG,
  TITLE_BUTTON_CONFIG,
} from "./k-boom.config";
import { Subscription } from "rxjs";
import { User } from "src/app/commons/interfaces/user/user.class";
import { UserService } from "src/app/commons/services/user/user.service";
import { Scene } from "../game-objects/scene";

const NUMBER_OF_BUTTONS: number = 3;
export class MenuScene extends Scene {
  private subUser: Subscription;
  private user: User = new User();

  private titleButton: TextButton;
  private playButton: TextButton;
  private levelsButton: TextButton;
  private exitButton: TextButton;
  private pointsButton: TextButton;

  constructor() {
    super(SCENES.MENU);
  }

  preload() {
    this.subUser = UserService.getCurrent().subscribe((user) =>
      this.user.assign(user)
    );
  }

  init() {}

  create() {
    super.fadeInScene();
    this.createAllButtons();
    this.addAllButtonsToScene();
    this.manageAllButtonEvent();
    this.throwAllInitialAnimation();
  }

  private createAllButtons(): void {
    this.titleButton = this.buildTitleButton();
    this.playButton = this.buildTextButton("PLAY", 0);
    this.levelsButton = this.buildTextButton("LEVELS", 100);
    this.exitButton = this.buildTextButton("EXIT", 200);
    this.pointsButton = this.buildPointsButton();
  }

  private addAllButtonsToScene(): void {
    this.add.existing(this.titleButton);
    this.add.existing(this.playButton);
    this.add.existing(this.levelsButton);
    this.add.existing(this.exitButton);
    this.add.existing(this.pointsButton);
  }

  private manageAllButtonEvent(): void {
    this.playButton.on("pointerdown", () => {
      this.subUser.unsubscribe();
      this.sound.stopAll();
      super.fadeOutScene(SCENES.GAME);
    });
    this.levelsButton.on("pointerdown", () => {
      this.subUser.unsubscribe();
      super.fadeOutScene(SCENES.LEVELS);
    });
    this.exitButton.on("pointerdown", () => {
      this.subUser.unsubscribe();
      super.killGame();
    });
  }

  private throwAllInitialAnimation(): void {
    super.animateItems(this.playButton, this.renderer.width / 2 - 60);
    super.animateItems(this.levelsButton, this.renderer.width / 2 - 90, 350);
    super.animateItems(this.exitButton, this.renderer.width / 2 - 60, 400);
    super.animateItems(this.pointsButton, 10, 400)
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

  private buildPointsButton(): TextButton {
    return new TextButton(
      this,
      -300,
      this.renderer.height - 50,
      this.user.formattedPoints(),
      TERTIARY_BUTTON_CONFIG
    );
  }

  private buildTextButton(text: string, yDifferneceFactor: number): TextButton {
    return new TextButton(
      this,
      this.scale.width + 300,
      this.renderer.height / NUMBER_OF_BUTTONS + yDifferneceFactor,
      text,
      BUTTON_CONFIG
    );
  }
}
