import {
  IMAGES,
  IMG_MAIN_PATH,
  MUSIC,
  MUSIC_MAIN_PATH,
  SOUNDS,
  SOUNDS_MAIN_PATH,
  SPRITES,
  SPRITES_MAIN_PATH,
  SVGS,
  SVG_MAIN_PATH,
} from "../config/routes";

export function getMusicPath(section: string): string {
  return MUSIC_MAIN_PATH + "/" + MUSIC.get(section);
}

export function getSoundPath(section: string): string {
  return SOUNDS_MAIN_PATH + "/" + SOUNDS.get(section);
}

export function getImgPath(section: string): string {
  return IMG_MAIN_PATH + "/" + IMAGES.get(section);
}

export function getSvgPath(section: string): string {
  return SVG_MAIN_PATH + "/" + SVGS.get(section);
}

export function getSpritesPath(section: string): string {
  return SPRITES_MAIN_PATH + "/" + SPRITES.get(section);
}
