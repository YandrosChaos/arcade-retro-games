import Phaser, { Scene } from "phaser";
import { Level } from "src/app/commons/interfaces/game/level.class";
import { Level as LevelInterface } from "src/app/commons/interfaces/game/videogame.interface";
import { HolyData } from "src/app/commons/services/holy-data/holy-data.service";
import { TextButton } from "../game-objects/text-button";
import {
  BUTTON_CONFIG,
  SECONDARY_BUTTON_CONFIG,
} from "../scenes/k-boom.config";
import { BACKGROUND_CONF } from "./unlock-level.config";
import { MODAL_PRAY } from "../../commons/const/pray-name";

export default class UnlockLevelModal {
  private scene: Scene;
  private container!: Phaser.GameObjects.Container;

  private background: Phaser.GameObjects.Graphics;
  private unlockText: TextButton;
  private pointCostText: TextButton;
  private confirmButton: TextButton;
  private cancelButton: TextButton;

  private level: Level;

  constructor(scene: Scene, level: LevelInterface) {
    this.level = new Level();
    this.level.assign(level);
    this.scene = scene;
    this.container = scene.add.container(this.scene.scale.width + 300, 0);
    this.background = scene.add.graphics(BACKGROUND_CONF);

    this.background.fillRect(0, 0, scene.scale.width, scene.scale.height);
    this.container.add(this.background);
    this.container;
    this.setupButtons();
    this.addButtonEvents();
    this.addButtons();
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
      SECONDARY_BUTTON_CONFIG
    ).setOrigin(1, 0);
    this.cancelButton = this.createButton(
      35,
      150,
      "Nah",
      BUTTON_CONFIG
    ).setOrigin(-1, 0);
  }

  private addButtons(): void {
    this.container.add(this.unlockText);
    this.container.add(this.pointCostText);
    this.container.add(this.confirmButton);
    this.container.add(this.cancelButton);
  }

  private addButtonEvents(): void {
    this.confirmButton.on("pointerdown", () => this.hide());
    this.cancelButton.on("pointerdown", () => this.hide());
  }

  public show(): void {
    this.scene.add.tween({
      targets: this.container,
      x: 10,
      duration: 300,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
  }

  public hide(): void {
    HolyData.updatePrayer({ key: MODAL_PRAY, data: true });
    this.scene.add.tween({
      targets: this.container,
      x: this.scene.scale.width + 300,
      duration: 300,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
  }

  private createButton(
    xDifferenciator: number,
    yDifferenciator: number,
    text: string,
    style: Phaser.Types.GameObjects.Text.TextStyle = SECONDARY_BUTTON_CONFIG
  ): TextButton {
    return new TextButton(
      this.scene,
      this.scene.scale.width / 2 - xDifferenciator,
      this.scene.scale.height / 3 + yDifferenciator,
      text,
      style
    );
  }
}
