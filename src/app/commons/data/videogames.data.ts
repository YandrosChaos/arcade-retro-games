// K-BOOM! - Scenes
import { GameScene } from "@game-scenes/k-boom/scenes/game/game.scene";
import { LevelsScene } from "@k-boom/scenes/levels/levels.scene";
import { LoadScene } from "@k-boom/scenes/load.scene";
import { MenuScene } from "@k-boom/scenes/menu.scene";
import { ScoreScene } from "@game-scenes/k-boom/scenes/score/score.scene";
import { Difficulty, VideoGame } from "@interfaces/game/videogame.interface";
import { WelcomeScene } from "@game-scenes/k-boom/scenes/welcome/welcome.scene";

// Space Invaders - Scenes
import { LoadScene as LoadSceneSpaceInvaders } from "@game-scenes/space-invaders/scenes/load/load.scene";

export const VIDEO_GAMES: VideoGame[] = [
  {
    name: "K-BOOM!",
    type: "arcade",
    imgLink: "assets/games/k-boom/img/menu_background.jpg",
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
  {
    name: "Space Invaders",
    type: "arcade",
    imgLink: "assets/games/space-invaders/img/alien.jpg",
    scenes: [LoadSceneSpaceInvaders],
    levels: [],
  },
  {
    name: "Pong",
    type: "arcade",
    imgLink: "assets/games/pong/pong.jpg",
    scenes: [],
    levels: [],
  },
  {
    name: "Klimber",
    type: "arcade",
    imgLink: "assets/games/klimber/gorilla.jpg",
    scenes: [],
    levels: [],
  },
];
