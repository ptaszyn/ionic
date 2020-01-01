import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

enum StorageKeys {
  IsDarkTheme
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private storage: Storage) {}

  public getDarkTheme(): Promise<any> {
    return this.storage.get(this.getStorageKeyName(StorageKeys.IsDarkTheme));
  }

  public setDarkTheme(isDarkTheme: boolean): void {
    document.body.classList.toggle('dark', isDarkTheme);
    this.storage.set(this.getStorageKeyName(StorageKeys.IsDarkTheme), isDarkTheme);
  }

  private getStorageKeyName(enumKey: StorageKeys): string {
    return 'settings_' + StorageKeys[enumKey].toString();
  }
}
