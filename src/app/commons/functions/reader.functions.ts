import { BehaviorSubject, Observable } from "rxjs";

let prayers: BehaviorSubject<string[]> = new BehaviorSubject([]);
let prayersObs: Observable<string[]> = prayers.asObservable();

export class HolyData {
  static getPrayer(): Observable<string[]> {
    return prayersObs;
  }

  static addPrayer(value: string): void {
    prayers.getValue().push(value);
    prayers.next(prayers.getValue());
  }

  static killPrayer(value: string): void {
    const prayerValues: string[] = prayers.getValue();
    const valueIndex: number = prayerValues.findIndex((item: string) => {
      value.toLowerCase() === item.toLowerCase();
    });
    if (valueIndex > -1) {
      prayerValues.splice(valueIndex, 1);
      prayers.next(prayerValues);
    }
  }

  static holyGrenade(): void {
    prayers = new BehaviorSubject([]);
    prayersObs = prayers.asObservable();
  }
}
