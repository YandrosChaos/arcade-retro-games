import { Bomb } from "../game-objects/throwable-item/bomb.interface";
import { SafePackage } from "../game-objects/throwable-item/safe-package.interface";

export function isBomb(obj: any): obj is Bomb {
  return obj.damage != 0;
}

export function isSafePackage(obj: any): obj is SafePackage {
  return obj.damage === 0;
}
