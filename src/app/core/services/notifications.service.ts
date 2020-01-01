import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Storage } from '@ionic/storage';
import { Topic } from '../models/topic.model';
import { StorageService } from './storage.service';

export const FCM_NOTS_TOPIC_PREFIX = 'nots_';
export const STORAGE_NOTIFICATIONS_TOPICS = 'nots_topics';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private fcm: FCM, private storageService: StorageService) {}

  public async getTopics(): Promise<Topic[]> {
    return await this.storageService.getValues(STORAGE_NOTIFICATIONS_TOPICS);
  }

  public async setTopic(topic: Topic) {
    await this.storageService.setValue(
      STORAGE_NOTIFICATIONS_TOPICS,
      topic.id,
      topic
    );
    topic.isSubscribe
      ? this.fcm.subscribeToTopic(FCM_NOTS_TOPIC_PREFIX + topic.id)
      : this.fcm.unsubscribeFromTopic(FCM_NOTS_TOPIC_PREFIX + topic.id);
  }
}
