import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuController, Platform } from "@ionic/angular";
import { HolyData } from "@services/holy-data/holy-data.service";
import { Subscription } from "rxjs";
import { EXIT_PRAY, GAME_PRAY } from "@const/pray-name";
import { Payload } from "@interfaces/HolyData/Payload";
import { VideoGame } from "@interfaces/game/videogame.interface";

@Component({
  selector: "app-game-loader",
  template: ` <ion-content>
    <div id="game"></div>
  </ion-content>`,
  styleUrls: ["game-loader.page.scss"],
})
export class GameLoaderPage implements OnInit, AfterViewInit, OnDestroy {
  private videoGame: VideoGame;
  private phaserGame: Phaser.Game;
  private config: Phaser.Types.Core.GameConfig;

  private subCloseGame: Subscription;
  private subGamedata: Subscription;

  constructor(
    private platform: Platform,
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    HolyData.addPrayer({ key: EXIT_PRAY, data: null });
    this.initAllSubscriptions();
  }

  private initAllSubscriptions(): void {
    this.subGamedata = HolyData.getPrayer(GAME_PRAY).subscribe(
      (payload: Payload) => this.onGame(payload)
    );

    this.subCloseGame = HolyData.getPrayer(EXIT_PRAY).subscribe(
      (payload: Payload) => {
        if (payload?.data) this.onGameExit();
      }
    );
  }

  private onGame(payload: Payload): void {
    if (payload && !this.phaserGame) {
      this.videoGame = { ...payload.data };
      this.setGameConfig();
      this.phaserGame = new Phaser.Game(this.config);
    }
    if (
      !payload ||
      this.videoGame.scenes.length === 0 ||
      this.videoGame.levels.length === 0
    )
      this.onGameExit();
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, "side-drawer-menu");
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true, "side-drawer-menu");
  }

  private setGameConfig(): void {
    this.config = {
      title: this.videoGame.name,
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
      scene: this.videoGame.scenes,
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
      backgroundColor: "#000000",
    };
  }

  private onGameExit(): void {
    this.ngOnDestroy();
    this.router.navigate(["/"]);
  }

  ngOnDestroy() {
    this.phaserGame?.destroy(false);
    this.subCloseGame?.unsubscribe();
    this.subGamedata?.unsubscribe();
    HolyData?.holyGrenade();
  }
}
