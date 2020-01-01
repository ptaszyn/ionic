import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../core/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  public isDarkTheme: boolean;

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.settingsService.getDarkTheme().then(value => {
      this.isDarkTheme = value;
    });
  }

  public isDarkThemeChange(): void {
    this.settingsService.setDarkTheme(this.isDarkTheme);
  }
}
