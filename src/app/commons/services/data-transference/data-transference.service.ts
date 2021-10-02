import { Injectable } from "@angular/core";
import { DataTransferItem } from "../../interfaces/data-transfer.interface";
import { AbstractService } from "../abstract/abstract-service.interface";

@Injectable()
export class DataTransferenceService
  implements AbstractService<DataTransferItem>
{
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

  public create(item: DataTransferItem): void {
    if (this.dataTransferItems) {
      this.dataTransferItems.push(item);
    } else {
      this.dataTransferItems = [];
      this.dataTransferItems.push(item);
    }
  }

  public update(item: DataTransferItem): void {
    throw "not implemented yet";
  }

  public delete(key: string): void {
    const index: number = this.dataTransferItems.findIndex(
      (item: DataTransferItem) => item.key === key
    );
    if (index > -1) this.dataTransferItems.splice(index, 1);
  }

  public holyGrenade(): void {
    this.dataTransferItems = undefined;
  }
}
