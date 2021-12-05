import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GAME_PRAY } from "../commons/const/pray-name";
import { VIDEO_GAMES } from "../commons/data/videogames.data";
import { Videogame } from "../commons/interfaces/videogame.interface";
import { HolyData } from "../commons/services/holy-data/holy-data.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit, OnDestroy {
  private games: Videogame[] = VIDEO_GAMES;

  public filteredGames: Videogame[] = VIDEO_GAMES;
  public isSearching: boolean = false;

  constructor(private router: Router) {}

  public ngOnInit(): void {}

  public onNavigate(game: Videogame): void {
    HolyData.addPrayer({
      key: GAME_PRAY,
      data: {
        gameName: game.name,
        scenes: game.scenes,
      },
    });
    this.router.navigate(["/game-loader"]);
  }

  public onSearchValueChanged(event): void {
    const item: string = event.detail.value;
    const inputValue: string = this.transformInputValue(item);
    this.filteredGames = this.games.filter(
      (game: Videogame) =>
        this.transformInputValue(game.name).includes(inputValue) ||
        this.transformInputValue(game.type).includes(inputValue)
    );
  }

  private transformInputValue(value: string): string {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
  }

  public onSearchButtonTouched(): void {
    this.isSearching = !this.isSearching;
  }

  public ngOnDestroy(): void {}
}
