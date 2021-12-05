export const IMAGES: Map<string, string> = new Map([
  ["background-menu", "menu_background.jpg"],
  ["background", "space.jpg"],
  ["floor", "sand.png"],
  ["bomb", "bomb.svg"],
  ["bomb-nuclear", "bomb-nuclear.svg"],
  ["bomb-atomic", "bomb-atomic.svg"],
  ["safe-pak", "paracaidas.svg"],
  ["RIP", "skull.svg"],
  ["background-menu-2", "menu-background-2.jpg"],
]);

export const SOUNDS: Map<string, string> = new Map([
  ["ingame-music", "IntergalacticOdyssey.ogg"],
  ["menu-music", "k-boom_menu.mp3"],
  ["explosion-sound", "explosion-sound-effect.mp3"],
  ["dead-sound", "deadnotification.wav"],
  ["start-sound", "start-game.wav"],
  ["safe-bonus", "extra-bonus.wav"],
]);

export const SPRITES: Map<string, string> = new Map([
  ["explode", "explode.png"],
]);

export enum SCENES {
  LOAD = "LoadScene",
  WELCOME = "WelcomeScene",
  MENU = "MenuScene",
  GAME = "GameScene",
  SCORE = "ScoreScene",
  LEVELS = "LevelsScene",
}

// game name
export const GAME_NAME: string = "K-BOOM!";

// scenes names
export const WELCOME_SCENE_NAME: string = "WelcomeScene";
export const GAME_SCENE_NAME: string = "GameScene";
export const SCORE_SCENE_NAME: string = "ScoreScene";
export const LOAD_SCENE_NAME: string = "LoadScene";

// section names
export const BACKGROUND_MENU_SECTION_NAME: string = "background-menu";
export const BACKGROUND_SECTION_NAME: string = "background";
export const FLOOR_SECTION_NAME: string = "floor";
export const BOMB_SECTION_NAME: string = "bomb";
export const BOMB_NUCLEAR_SECTION_NAME: string = "bomb-nuclear";
export const BOMB_ATOMIC_SECTION_NAME: string = "bomb-atomic";
export const SAFE_PACK_SECTION_NAME: string = "safe-pak";

export const EXPLOSION_SECTION_NAME: string = "kaboom";
export const RIP_SECTION_NAME: string = "RIP";

export const MAIN_GAME_MUSIC_SECTION_NAME: string = "ingame-music";
export const MENU_MUSIC_SECTION_NAME: string = "menu-music";
export const EXPLOSION_SOUND_SECTION_NAME: string = "explosion-sound";
export const DEAD_SOUND_SECTION_NAME: string = "dead-sound";
export const START_SOUND_SECTION_NAME: string = "start-sound";
export const BONUS_SOUND_SECTION_NAME: string = "safe-bonus";

// animations names
export const KABOOM_ANIM_NAME: string = "explode";

//font names
export const TITLE_FONT_NAME: string = "Xenon";
export const TEXT_FONT_NAME: string = "Minecraft";

//assets
//xenon font resources
export const TITLE_BITMAP_FONT_PATH_PNG: string =
  "assets/fonts/xenon/Xenon.png";
export const TITLE_BITMAP_FONT_PATH_FNT: string =
  "assets/fonts/xenon/Xenon.fnt";

//minecraft font resources
export const TEXT_BITMAP_FONT_PATH_PNG: string =
  "assets/fonts/minecraft/minecraft-green.png";
export const TEXT_BITMAP_FONT_PATH_FNT: string =
  "assets/fonts/minecraft/minecraft-green.fnt";

//image paths
export const BACKGROUND_MENU_IMG_PATH: string =
  "assets/games/k-boom/menu_background.jpg";
export const BACKGROUND_IMG_PATH: string = "assets/games/k-boom/space.jpg";
export const BOMB_IMG_PATH: string = "assets/games/k-boom/bomb.svg";
export const BOMB_ATOMIC_IMG_PATH: string =
  "assets/games/k-boom/bomb-atomic.svg";
export const BOMB_NUCLEAR_IMG_PATH: string =
  "assets/games/k-boom/bomb-nuclear.svg";
export const FLOOR_IMG_PATH: string = "assets/games/k-boom/sand.png";
export const KABOOM_IMG_PATH: string = "assets/games/k-boom/explode.png";
export const RIP_IMG_PATH: string = "assets/games/k-boom/skull.svg";
export const SAFE_PACK_IMG_PATH: string = "assets/games/k-boom/paracaidas.svg";

// music paths
export const MENU_MUSIC_PATH: string = "assets/games/k-boom/k-boom_menu.mp3";
export const MAIN_GAME_MUSIC_PATH: string =
  "assets/games/k-boom/IntergalacticOdyssey.ogg";

//sound paths
export const START_SOUND_PATH: string = "assets/games/k-boom/start-game.wav";
export const BONUS_SOUND_PATH: string = "assets/games/k-boom/extra-bonus.wav";
export const DEAD_SOUND_PATH: string =
  "assets/games/k-boom/deadnotification.wav";
export const EXPLOSION_SOUND_PATH: string =
  "assets/games/k-boom/explosion-sound-effect.mp3";
