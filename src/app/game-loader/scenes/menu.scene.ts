import { Component } from "@angular/core";
import { TextButton } from "../game-objects/text-button";
import { SCENES } from "./k-boom.routes";
import Phaser from "phaser";

@Component({
  selector: "app-never",
  template: "",
})
export class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENES.MENU,
    });
  }

  preload() {
    this.load.image("menu-2", "assets/games/k-boom/menu-background-2.jpg");
  }

  init() {}

  create() {
    const background: Phaser.GameObjects.TileSprite = this.add.tileSprite(
      this.renderer.width / 2,
      this.renderer.height / 2,
      this.renderer.width * 1,
      this.renderer.height * 1,
      "menu-2"
    );
    const playButton = new TextButton(
      this,
      this.renderer.width / 2 - 60,
      this.renderer.height / 3,
      "PLAY",
      {
        font: "3rem Minecraft",
        color: "#BC00FF",
      }
    );
    const levelsButton = new TextButton(
      this,
      this.renderer.width / 2 - 90,
      this.renderer.height / 3 + 100,
      "LEVELS",
      {
        font: "3rem Minecraft",
        color: "#BC00FF",
      }
    );
    const optionsButton = new TextButton(
      this,
      this.renderer.width / 2 - 105,
      this.renderer.height / 3 + 200,
      "OPTIONS",
      {
        font: "3rem Minecraft",
        color: "#BC00FF",
      }
    );

    this.add.existing(optionsButton);
    this.add.existing(playButton);
    this.add.existing(levelsButton);
    playButton.on("pointerdown", () => {
      this.sound.stopAll();
      this.scene.start(SCENES.GAME);
    });
    optionsButton.on("pointerdown", () => {});
  }
}
