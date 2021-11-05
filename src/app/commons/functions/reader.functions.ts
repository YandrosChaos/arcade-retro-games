import { BehaviorSubject, Observable, of } from "rxjs";

let gamedata: BehaviorSubject<string[]> = new BehaviorSubject(["game data!"]);
let gameDataObservable: Observable<string[]> = gamedata.asObservable();

export function readGameData(): Observable<string[]> {
  return gameDataObservable;
}

export function writeGameData(value: string): void {
  gamedata.getValue().push(value);
  gamedata.next(gamedata.getValue());
}
