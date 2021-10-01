import { Injectable } from "@angular/core";
import { DataTransferItem } from "../interfaces/data-transfer.interface";

@Injectable()
export class DataTransferenceService {
  private dataTransferItems: DataTransferItem[];

  constructor() {}

  public getAll(): DataTransferItem[] {
    return this.dataTransferItems;
  }

  public getOne(key: string): DataTransferItem {
    return this.dataTransferItems?.find(
      (item: DataTransferItem) => item.key === key
    );
  }

  public save(item: any): void {
    if (this.dataTransferItems) {
      this.dataTransferItems.push(item);
    } else {
      this.dataTransferItems = [];
      this.dataTransferItems.push(item);
    }
  }

  public clearAll(): void {
    this.dataTransferItems = undefined;
  }

  public clearOne(key: string): void {
    const index: number = this.dataTransferItems.findIndex(
      (item: DataTransferItem) => item.key === key
    );
    if (index > -1) this.dataTransferItems.splice(index, 1);
  }
}
