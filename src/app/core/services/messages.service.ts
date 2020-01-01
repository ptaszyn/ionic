import { Injectable } from '@angular/core';

import { FCM } from '@ionic-native/fcm/ngx';
import { Message } from '../models/message.model';
import { Topic } from '../models/topic.model';
import { StorageService } from './storage.service';

export const FCM_DATA_TOPIC_PREFIX = 'data_';
export const STORAGE_MESSAGES_DATA_PREFIX = 'mess_data_';
export const STORAGE_MESSAGES_DATA_KEY = 'body';
export const STORAGE_MESSAGES_TOPICS = 'mess_topics';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private fcm: FCM, private storageService: StorageService) {}

  public async getTopics(): Promise<Topic[]> {
    return await this.storageService.getValues(STORAGE_MESSAGES_TOPICS);
  }

  public async setTopic(topic: Topic) {
    await this.storageService
      .setValue(STORAGE_MESSAGES_TOPICS, topic.id, topic)
      .then(() => {
        topic.isSubscribe
          ? this.fcm.subscribeToTopic(FCM_DATA_TOPIC_PREFIX + topic.id)
          : this.fcm.unsubscribeFromTopic(FCM_DATA_TOPIC_PREFIX + topic.id);
      });
  }

  public async getMessages(): Promise<Message[]> {
    let messages: Message[];
    messages = await this.storageService.getValuesLike(
      STORAGE_MESSAGES_DATA_PREFIX
    );
    await messages.map(
      async message =>
        (message.topicName = await this.getTopicName(message.topic))
    );
    console.log('getM: ' + messages);
    return messages;
  }

  public setMessage(message: Message) {
    //message.topicName = this.getTopicName(message.topic);
    console.log('setM: ' + JSON.stringify(message));
    this.storageService.setValue(
      STORAGE_MESSAGES_DATA_PREFIX + message.topic,
      message.topic,
      message
    );
  }

  public async getTopicName(topicId: string): Promise<string> {
    let topicName;
    await this.storageService
      .getValue(STORAGE_MESSAGES_TOPICS, topicId, 'name')
      .then(name => (topicName = name ? name : topicId));
    console.log('getT: ' + topicName);
    return topicName;
  }
}
