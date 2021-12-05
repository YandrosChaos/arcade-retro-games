import { GameScene } from "src/app/game-loader/scenes/game.scene";
import { LevelsScene } from "src/app/game-loader/scenes/levels.scene";
import { LoadScene } from "src/app/game-loader/scenes/load.scene";
import { MenuScene } from "src/app/game-loader/scenes/menu.scene";
import { ScoreScene } from "src/app/game-loader/scenes/score.scene";
import { WelcomeScene } from "src/app/game-loader/scenes/welcome.scene";
import { Videogame } from "../interfaces/videogame.interface";

export const VIDEO_GAMES: Videogame[] = [
  {
    name: "K-BOOM!",
    type: "arcade",
    imgLink: "assets/games/k-boom/menu_background.jpg",
    scenes: [LoadScene, WelcomeScene, MenuScene, GameScene, ScoreScene, LevelsScene],
  },
];
