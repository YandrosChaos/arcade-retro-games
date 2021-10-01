import { GameScene } from "src/app/game-loader/scenes/game.scene";
import { ScoreScene } from "src/app/game-loader/scenes/score.scene";
import { WelcomeScene } from "src/app/game-loader/scenes/welcome.scene";
import { Videogame } from "../interfaces/videogame.interface";

export const VIDEO_GAMES: Videogame[] = [
  {
    name: "K-BOOM!",
    type: "arcade",
    imgLink: "assets/games/k-boom/menu_background.jpg",
    scenes: [WelcomeScene, GameScene, ScoreScene],
  },
];
