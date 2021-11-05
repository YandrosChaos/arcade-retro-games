import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuController, Platform } from "@ionic/angular";
import Phaser from "phaser";
import { DataTransferenceService } from "../commons/services/data-transference/data-transference.service";
import { DataTransferItem } from "../commons/interfaces/data-transfer.interface";
import {
  readGameData,
  writeGameData,
} from "../commons/functions/reader.functions";

export let platformWidth: number = 0;
export let platformHeight: number = 0;

@Component({
  selector: "app-game-loader",
  templateUrl: "game-loader.page.html",
  styleUrls: ["game-loader.page.scss"],
})
export class GameLoaderPage implements OnInit, OnDestroy {
  private gameName: string;
  private scenes: Phaser.Scene[];
  private phaserGame: Phaser.Game;
  private config: Phaser.Types.Core.GameConfig;

  constructor(
    private platform: Platform,
    private router: Router,
    private menuCtrl: MenuController,
    private dataTransferenceService: DataTransferenceService
  ) {
    platformWidth = platform.width();
    platformHeight = platform.height();
    const game: DataTransferItem =
      this.dataTransferenceService.getOne("K-BOOM!");
    if (!game) this.router.navigate(["/home"]);
    this.gameName = game.data.gameName;
    this.scenes = game.data.scenes;
    this.config = {
      title: this.gameName,
      width: platformWidth,
      height: platformHeight,
      render: {
        pixelArt: true,
      },
      scale: {
        width: platformWidth,
        height: platformHeight,
      },
      parent: "game",
      scene: this.scenes,
      physics: {
        default: "arcade",
        arcade: {
          debug: true,
        },
      },
      backgroundColor: "#000000",
    };
  }

  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);

    readGameData().subscribe((changes) => {
      if (changes.includes("exit")) {
        this.phaserGame.destroy(true);
        this.router.navigate(["/"]);
      }
    });

    writeGameData("1234");
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, "side-drawer-menu");
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true, "side-drawer-menu");
  }

  ngOnDestroy() {
    this.phaserGame.destroy(true, false);
    this.dataTransferenceService.delete(this.gameName);
  }
}
