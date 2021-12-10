import { Level, VideoGame as VGDataStructure } from "./videogame.interface";

export class VideoGame implements VGDataStructure {
  name?: string;
  type?: string;
  imgLink?: string;
  scenes?: any[];
  levels?: Level[];

  public assign(dataStructure: VGDataStructure): void {
    Object.keys(dataStructure).forEach(
      (key: string) => (this[key] = dataStructure[key])
    );
  }

  public findLevelByName(lvlName: string): Level {
    return this.levels.find((level: Level) => level.name === lvlName);
  }

  public unlockLevel(levelName: string): void {
    this.findLevelByName(levelName).unlocked = true;
  }
}
