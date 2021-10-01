import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataTransferenceService } from "../commons/data-transference/data-transference.service";
import { VIDEO_GAMES } from "../commons/data/videogames.data";
import { Videogame } from "../commons/interfaces/videogame.interface";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit, OnDestroy {
  public games: Videogame[] = VIDEO_GAMES;

  constructor(
    private router: Router,
    private dataTransferenceService: DataTransferenceService
  ) {}

  ngOnInit() {}

  public onNavigate(game: Videogame): void {
    this.dataTransferenceService.save({
      key: game.name,
      data: {
        gameName: game.name,
        scenes: game.scenes,
      },
    });
    this.router.navigate(["/game-loader"]);
  }

  ngOnDestroy() {
    this.dataTransferenceService.clearAll();
  }
}
