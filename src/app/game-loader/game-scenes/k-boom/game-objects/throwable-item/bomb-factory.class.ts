import { Scene } from "@game-objects/scene";
import {
  BOMB_ATOMIC_SECTION,
  BOMB_NUCLEAR_SECTION,
  BOMB_SECTION,
  SAFE_PACK_SECTION,
} from "@game-scenes/k-boom/config/k-boom.section";
import { generateRandomBetween } from "@game-scenes/k-boom/functions/random.functions";
import { Bomb } from "./bomb.interface";
import { SafePackage } from "./safe-package.interface";
import { ThrowableItem } from "./throwable-item";
import { PointerEvent } from "@interfaces/events/events.interface";

export class BombFactory {
  constructor(private scene: Scene, private ranges: number[]) {}

  public buildThrowableItem(): ThrowableItem {
    const randomBombType: number = generateRandomBetween(0, 100);
    const x: number = generateRandomBetween(25, this.scene.renderer.width - 25);
    const y: number = 25;
    if (randomBombType < this.ranges[0]) {
      return this.buildBomb(BOMB_SECTION, x, y, 1, 1, 100, 200);
    } else if (
      randomBombType >= this.ranges[0] &&
      randomBombType < this.ranges[1]
    ) {
      return this.buildBomb(BOMB_NUCLEAR_SECTION, x, y, 10, 2, 150, 200);
    } else if (
      randomBombType >= this.ranges[1] &&
      randomBombType < this.ranges[2]
    ) {
      return this.buildBomb(BOMB_ATOMIC_SECTION, x, y, 100, 3, 200, 230);
    } else {
      return this.buildSafePackage(x, y);
    }
  }

  private buildBomb(
    section: string,
    x: number,
    y: number,
    points: number,
    damage: number,
    randomVelocityFrom: number,
    randomVelocityTo: number
  ): Bomb {
    const randomBombWidth: number = generateRandomBetween(0.17, 0.25);
    const bomb: Bomb = this.scene.physics.add.image(x, y, section);
    bomb.generatedVelocity = generateRandomBetween(
      randomVelocityFrom,
      randomVelocityTo
    );
    bomb.setDisplaySize(
      this.scene.renderer.width * randomBombWidth,
      this.scene.renderer.height * 0.15
    );
    bomb.setVelocity(0, bomb.generatedVelocity);
    bomb.setInteractive();
    bomb.points = points;
    bomb.damage = damage;
    return bomb;
  }

  private buildSafePackage(x: number, y: number): SafePackage {
    const randomWidth: number = generateRandomBetween(0.17, 0.25);
    const safePackage: SafePackage = this.scene.physics.add.image(
      x,
      y,
      SAFE_PACK_SECTION
    );
    safePackage.generatedVelocity = generateRandomBetween(200, 230);
    safePackage.setDisplaySize(
      this.scene.renderer.width * randomWidth,
      this.scene.renderer.height * 0.15
    );
    safePackage.setVelocity(0, safePackage.generatedVelocity);
    safePackage.setInteractive();
    safePackage.points = 0;
    safePackage.damage = 0;
    return safePackage;
  }
}
