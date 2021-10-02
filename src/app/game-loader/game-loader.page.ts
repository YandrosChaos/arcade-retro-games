import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Platform } from "@ionic/angular";
import Phaser from "phaser";
import { DataTransferenceService } from "../commons/services/data-transference/data-transference.service";
import { DataTransferItem } from "../commons/interfaces/data-transfer.interface";
import { GameScene } from "./scenes/game.scene";
import { GAME_NAME } from "./scenes/k-boom.routes";
import { ScoreScene } from "./scenes/score.scene";
import { WelcomeScene } from "./scenes/welcome.scene";

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
      scale: {
        width: platformWidth,
        height: platformHeight,
      },
      parent: "game",
      scene: this.scenes,
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
      backgroundColor: "#000000",
    };
  }
  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }

  ngOnDestroy() {
    this.phaserGame.destroy(true, false);
    this.dataTransferenceService.delete(this.gameName);
  }
}
