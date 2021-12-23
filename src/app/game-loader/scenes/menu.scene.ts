import { TextButton } from "../game-objects/text-button";
import { SCENES } from "./k-boom.routes";
import Phaser from "phaser";
import { HolyData } from "src/app/commons/services/holy-data/holy-data.service";
import { EXIT_PRAY } from "src/app/commons/const/pray-name";
import {
  BUTTON_CONFIG,
  TERTIARY_BUTTON_CONFIG,
  TITLE_BUTTON_CONFIG,
} from "./k-boom.config";
import { Subscription } from "rxjs";
import { User } from "src/app/commons/interfaces/user/user.class";
import { UserService } from "src/app/commons/services/user/user.service";

const NUMBER_OF_BUTTONS: number = 3;
export class MenuScene extends Phaser.Scene {
  private subUser: Subscription;
  private user: User = new User();

  constructor() {
    super({
      key: SCENES.MENU,
    });
  }

  preload() {
    this.subUser = UserService.getCurrent().subscribe((user) =>
      this.user.assign(user)
    );
  }

  init() {}

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    const titleButton = this.buildTitleButton();
    const playButton = this.buildTextButton("PLAY", 60, 0);
    const levelsButton = this.buildTextButton("LEVELS", 90, 100);
    const exitButton = this.buildTextButton("EXIT", 60, 200);
    const pointsText = this.buildPointsButton();

    this.add.existing(titleButton);
    this.add.existing(playButton);
    this.add.existing(levelsButton);
    this.add.existing(exitButton);
    this.add.existing(pointsText);
    playButton.on("pointerdown", () => {
      this.subUser.unsubscribe();
      this.sound.stopAll();
      this.fadeOutScene(SCENES.GAME);
    });
    levelsButton.on("pointerdown", () => {
      this.subUser.unsubscribe();
      this.fadeOutScene(SCENES.LEVELS);
    });
    exitButton.on("pointerdown", () => {
      this.subUser.unsubscribe();
      this.killGame();
    });
  }

  private fadeOutScene(scene: string): void {
    this.cameras.main.fadeOut(1000, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
      this.scene.start(scene)
    });
  }

  private killGame():void{
    this.cameras.main.fadeOut(1000, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => { HolyData.updatePrayer({key: EXIT_PRAY, data: "exit"})});
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
      10,
      this.renderer.height - 50,
      this.user.formattedPoints(),
      TERTIARY_BUTTON_CONFIG
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
}
