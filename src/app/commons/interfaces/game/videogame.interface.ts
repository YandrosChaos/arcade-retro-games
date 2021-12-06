export interface VideoGame {
  name?: string;
  type?: string;
  imgLink?: string;
  scenes?: any[];
  levels?: Level[];
}

export interface Level {
  name: string;
  type: Difficulty;
  unlockPoints: number;
  hardnessMultiplicator: number;

  backgroundPath?: string;
  musicPath?: string;
}

export enum Difficulty {
  Easy = "easy",
  Normal = "normal",
  Hard = "hard",
}
