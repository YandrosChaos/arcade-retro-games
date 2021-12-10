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
        unlocked: true,
        hardnessMultiplicator: 1,
        ranges: [85, 95, 98],
      },
      {
        name: "Level 1",
        type: Difficulty.Easy,
        backgroundPath: "",
        musicPath: "",
        unlockPoints: 1000,
        unlocked: false,
        hardnessMultiplicator: 2,
        ranges: [75, 95, 98],
      },
      {
        name: "Level 2",
        type: Difficulty.Normal,
        backgroundPath: "",
        musicPath: "",
        unlockPoints: 1500,
        unlocked: false,
        hardnessMultiplicator: 3,
        ranges: [70, 90, 98],
      },
      {
        name: "Level 3",
        type: Difficulty.Normal,
        backgroundPath: "",
        musicPath: "",
        unlockPoints: 2500,
        unlocked: false,
        hardnessMultiplicator: 4,
        ranges: [65, 90, 98],
      },
      {
        name: "Level 4",
        type: Difficulty.Hard,
        backgroundPath: "",
        musicPath: "",
        unlockPoints: 5000,
        unlocked: false,
        hardnessMultiplicator: 5,
        ranges: [50, 75, 98],
      },
      {
        name: "Level 5",
        type: Difficulty.Hard,
        backgroundPath: "",
        musicPath: "",
        unlockPoints: 9999,
        unlocked: false,
        hardnessMultiplicator: 6,
        ranges: [50, 65, 98],
      },
    ],
  },
];
