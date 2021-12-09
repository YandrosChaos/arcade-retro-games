import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../../interfaces/user/user.interface";

let user: BehaviorSubject<User> = new BehaviorSubject({
  name: "SnowCrash",
  hash: "SnowCrash",
  points: 1000,
});
let userObs: Observable<User> = user.asObservable();

export class UserService {
  static getCurrent(): Observable<User> {
    return userObs;
  }

  static update(value: User): void {
    user.getValue().points = value.points;
    user.getValue().name = value.name;
    user.next(user.getValue());
  }

  static sumPoints(value: number): void {
    user.getValue().points += value;
    user.next(user.getValue());
  }

  static diffPoints(value: number): void {
    user.getValue().points -= value;
    user.next(user.getValue());
  }

  static resetPoints(): void {
    user.getValue().points = 0;
    user.next(user.getValue());
  }
}
