import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SettingsService } from './core/services/settings.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { MessagesService } from './core/services/messages.service';
import { Storage } from '@ionic/storage';
import { Message } from './core/models/message.model';
import { Information } from './core/models/information.model';
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Set Notifications',
      url: '/notifications',
      icon: 'alert'
    },
    {
      title: 'Set Data Messages',
      url: '/messages',
      icon: 'grid'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private settingsService: SettingsService,
    private messagesService: MessagesService,
    private fcm: FCM,
    private storageService: StorageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.onReceiveMessageHandler();
    });
    this.checkSettings();
  }

  private async checkSettings() {
    this.settingsService.getDarkTheme().then(value => {
      this.settingsService.setDarkTheme(value);
    });
    /*
    //test
    const info: Array<Information> = [
      {
        status: 'OK',
        title: 'Notification',
        text: 'txtOK sad sd dsaad sd sa sad sdsadsadsa dsadsad'
      },
      { status: 'ERROR', title: 'Notification', text: 'txtOK' }
    ];
    const messages: Message = {
      topic: 'top1',
      topicName: 'Temat nr 1',
      time: '2020-01-15 21:34:117',
      informations: info
    };

    await this.messagesService.setMessage(messages);

    const messages1: Message = {
      topic: 'id1',
      topicName: 'Temat nr 111',
      time: '2020-01-15 21:34:116',
      informations: info
    };

    await this.messagesService.setMessage(messages1);*/
  }

  private onReceiveMessageHandler() {
    this.fcm.onNotification().subscribe(data => {
      console.log('------> data : ' + data.body);
      this.messagesService.setMessage(JSON.parse(data.body));
    });
    this.fcm.getToken().then(token => {
      console.log('token: ' + token);
    });
  }
}
