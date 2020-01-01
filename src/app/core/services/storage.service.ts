import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) {}

  async getValues(storageKey: string): Promise<Array<any>> {
    let result = new Array();
    await this.storage.get(storageKey).then(objects => {
      if (objects) {
        result = Object.values(objects);
      }
    });
    return result;
  }

  async getValuesLike(storageKeyLike: string): Promise<Array<any>> {
    let objects: any = {};
    await this.storage.forEach((object: any, key: string) => {
      if (key.startsWith(storageKeyLike)) {
        objects = Object.assign(objects, object);
      }
    });
    return Object.values(objects);
  }

  async getValue(
    storageKey: string,
    valueKey: string,
    value: string
  ): Promise<any> {
    let result;
    await this.storage.get(storageKey).then(objects => {
      if (objects) {
        result = objects[valueKey][value];
      }
    });
    return result;
  }

  async setValue(storageKey: string, valueKey: string, value: any) {
    console.log('setV: ' + storageKey + valueKey+ JSON.stringify(value));
    await this.storage.get(storageKey).then(objects => {
      if (!objects) {
        objects = { [valueKey]: value };
      } else {
        objects[valueKey] = value;
      }
      this.storage.set(storageKey, objects);
    });
  }
}
