import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuController, Platform } from "@ionic/angular";
import Phaser from "phaser";
import { DataTransferenceService } from "../commons/services/data-transference/data-transference.service";
import { DataTransferItem } from "../commons/interfaces/data-transfer.interface";
import { HolyData } from "../commons/functions/reader.functions";
import { Subscription } from "rxjs";

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

  private subHolyData: Subscription;

  constructor(
    private platform: Platform,
    private router: Router,
    private menuCtrl: MenuController,
    private dataTransferenceService: DataTransferenceService
  ) {
    const game: DataTransferItem =
      this.dataTransferenceService.getOne("K-BOOM!");
    if (!game) this.router.navigate(["/home"]);
    this.gameName = game.data.gameName;
    this.scenes = game.data.scenes;
    this.config = {
      title: this.gameName,
      width: platform.width(),
      height: platform.height(),
      render: {
        pixelArt: true,
      },
      scale: {
        width: platform.width(),
        height: platform.height(),
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

    this.subHolyData = HolyData.getPrayer().subscribe((changes) => {
      if (changes.includes("exit")) {
        this.phaserGame.destroy(true);
        HolyData.killPrayer("exit");
        this.router.navigate(["/"]);
      }
    });
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
    this.subHolyData.unsubscribe();
  }
}
