import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GameScene } from "../game-loader/scenes/game.scene";
import { ScoreScene } from "../game-loader/scenes/score.scene";
import { WelcomeScene } from "../game-loader/scenes/welcome.scene";
import { DataTransferenceService } from "../commons/data-transference/data-transference.service";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private dataTransferenceService: DataTransferenceService
  ) {}

  ngOnInit() {}

  public onNavigateTo(): void {
    this.dataTransferenceService.save({
      key: "K-BOOM!",
      data: {
        gameName: "K-BOOM!",
        scenes: [WelcomeScene, GameScene, ScoreScene],
      },
    });
    this.router.navigate(["/game-loader"]);
  }

  ngOnDestroy() {
    this.dataTransferenceService.clearAll();
  }
}
