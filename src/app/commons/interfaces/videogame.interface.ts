export interface Videogame {
  name: string;
  type: string;
  imgLink: string;
  scenes: any[];
  levels?: Level[];
}

export interface Level {
  name: string;
  type: levelDifficulty;
  backgroundPath: string;
  musicPath: string;
  unlockPoints: number;
  hardnessMultiplicator: number;
}

export enum levelDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
