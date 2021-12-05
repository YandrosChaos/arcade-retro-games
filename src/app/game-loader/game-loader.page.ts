import Phaser from "phaser";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuController, Platform } from "@ionic/angular";
import { HolyData } from "../commons/services/holy-data/holy-data.service";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Payload } from "../commons/interfaces/HolyData/Payload";
import { EXIT_PRAY, GAME_PRAY } from "../commons/const/pray-name";

@Component({
  selector: "app-game-loader",
  templateUrl: "game-loader.page.html",
  styleUrls: ["game-loader.page.scss"],
})
export class GameLoaderPage implements OnInit, OnDestroy {
  private gameData;
  private phaserGame: Phaser.Game;
  private config: Phaser.Types.Core.GameConfig;

  private subCloseGame: Subscription;
  private subGamedata: Subscription;

  constructor(
    private platform: Platform,
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.subGamedata = HolyData.getPrayer(GAME_PRAY).subscribe((payload) => {
      if (payload) {
        this.gameData = payload.data;
        this.setGameConfig();
        this.phaserGame = new Phaser.Game(this.config);
      } else {
        this.router.navigate(["/"]);
      }
    });

    HolyData.addPrayer({ key: EXIT_PRAY, data: null });
    this.subCloseGame = HolyData.getPrayer(EXIT_PRAY).subscribe((item) => {
      if (item.data) this.onGameExit();
    });
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, "side-drawer-menu");
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true, "side-drawer-menu");
  }

  private setGameConfig(): void {
    this.config = {
      title: this.gameData.gameName,
      width: this.platform.width(),
      height: this.platform.height(),
      render: {
        pixelArt: true,
      },
      scale: {
        width: this.platform.width(),
        height: this.platform.height(),
      },
      parent: "game",
      scene: this.gameData.scenes,
      physics: {
        default: "arcade",
        arcade: {
          debug: true,
        },
      },
      backgroundColor: "#000000",
    };
  }

  private onGameExit(): void {
    this.phaserGame.destroy(true);
    this.router.navigate(["/"]);
  }

  ngOnDestroy() {
    this.phaserGame.destroy(true, false);
    this.subCloseGame.unsubscribe();
    this.subGamedata.unsubscribe();
    HolyData.holyGrenade();
  }
}
