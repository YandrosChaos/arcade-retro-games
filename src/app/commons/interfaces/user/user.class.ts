import { User as UserInterface } from "./user.interface";

export class User implements UserInterface {
  name: string;
  hash: string;
  image?: string;
  points: number;

  public assign(dataStructure: UserInterface): void {
    Object.keys(dataStructure).forEach(
      (key: string) => (this[key] = dataStructure[key])
    );
  }

  public formattedPoints(): string {
    if (this.points >= 0 && this.points <= 9) return "000" + this.points;
    if (this.points > 9 && this.points <= 99) return "00" + this.points;
    if (this.points > 99 && this.points <= 999) return "0" + this.points;
    if (this.points > 999 && this.points <= 9999) return this.points.toString();
  }
}
