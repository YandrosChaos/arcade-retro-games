import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Payload } from "../../interfaces/HolyData/Payload";

let prayers: BehaviorSubject<Payload[]> = new BehaviorSubject([]);
let prayersObs: Observable<Payload[]> = prayers.asObservable();

export class HolyData {
  static getPrayer(key: string): Observable<Payload> {
    return prayersObs.pipe(
      map((items) => items.find((item) => item.key === key))
    );
  }

  static addPrayer(value: Payload): void {
    const foundedPrayIndex: number = prayers
      .getValue()
      .findIndex((item) => item.key === value.key);
    if (foundedPrayIndex > -1) {
      prayers.getValue()[foundedPrayIndex].data = value.data;
    } else {
      prayers.getValue().push(value);
    }
    prayers.next(prayers.getValue());
  }

  static updatePrayer(value: Payload): void {
    const foundedPrayIndex: number = prayers
      .getValue()
      .findIndex((item) => item.key === value.key);

    if (foundedPrayIndex > -1) {
      prayers.getValue()[foundedPrayIndex].data = value.data;
    } else {
      prayers.getValue().push(value);
    }
    prayers.next(prayers.getValue());
  }

  static killPrayer(key: string): void {
    const prayerValues: any[] = prayers.getValue();
    const valueIndex: number = prayerValues.findIndex((item: Payload) => {
      key.toLowerCase() === item.key.toLowerCase();
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
