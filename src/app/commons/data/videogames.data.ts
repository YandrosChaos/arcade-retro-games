import { GameScene } from "src/app/game-loader/scenes/game.scene";
import { LevelsScene } from "src/app/game-loader/scenes/levels.scene";
import { LoadScene } from "src/app/game-loader/scenes/load.scene";
import { MenuScene } from "src/app/game-loader/scenes/menu.scene";
import { ScoreScene } from "src/app/game-loader/scenes/score.scene";
import { WelcomeScene } from "src/app/game-loader/scenes/welcome.scene";
import { Difficulty, VideoGame } from "../interfaces/game/videogame.interface";

export const VIDEO_GAMES: VideoGame[] = [
  {
    name: "K-BOOM!",
    type: "arcade",
    imgLink: "assets/games/k-boom/menu_background.jpg",
    scenes: [
      LoadScene,
      WelcomeScene,
      MenuScene,
      GameScene,
      ScoreScene,
      LevelsScene,
    ],
    levels: [
      {
        name: "Level 0",
        type: Difficulty.Easy,
        backgroundPath: "",
        musicPath: "",
        unlockPoints: 0,
        hardnessMultiplicator: 1,
      },
      {
        name: "Level 1",
        type: Difficulty.Normal,
        backgroundPath: "",
        musicPath: "",
        unlockPoints: 300,
        hardnessMultiplicator: 2,
      },
      {
        name: "Level 2",
        type: Difficulty.Hard,
        backgroundPath: "",
        musicPath: "",
        unlockPoints: 1000,
        hardnessMultiplicator: 3,
      },
    ],
  },
];
