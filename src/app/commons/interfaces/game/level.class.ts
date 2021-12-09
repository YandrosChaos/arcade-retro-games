import { Difficulty, Level as LevelInterface } from "./videogame.interface";

export class Level implements LevelInterface {
  name: string;
  type: Difficulty;
  unlockPoints: number;
  unlocked: boolean;
  hardnessMultiplicator: number;
  backgroundPath?: string;
  musicPath?: string;

  public assign(dataStructure: LevelInterface): void {
    Object.keys(dataStructure).forEach(
      (key: string) => (this[key] = dataStructure[key])
    );
  }

  public formattedPoints(): string {
    if (this.unlockPoints >= 0 && this.unlockPoints <= 9)
      return "000" + this.unlockPoints + "P";
    if (this.unlockPoints > 9 && this.unlockPoints <= 99)
      return "00" + this.unlockPoints + "P";
    if (this.unlockPoints > 99 && this.unlockPoints <= 999)
      return "0" + this.unlockPoints + "P";
    if (this.unlockPoints > 999 && this.unlockPoints <= 9999)
      return this.unlockPoints.toString() + "P";
  }
}
