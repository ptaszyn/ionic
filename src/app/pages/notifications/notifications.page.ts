import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { Topic } from 'src/app/core/models/topic.model';
import { ModalController, ToastController } from '@ionic/angular';
import { TopicComponent } from 'src/app/shared/topic/topic.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss']
})
export class NotificationsPage implements OnInit {
  public topics: Topic[];

  constructor(
    private notificationsService: NotificationsService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadTopics();
  }

  loadTopics() {
    this.notificationsService
      .getTopics()
      .then(topics => (this.topics = topics));
  }

  setTopic(topic: Topic) {
    this.notificationsService.setTopic(topic).then(() => {
      this.loadTopics();
      this.presentToast(topic.name);
    });
  }

  newTopic() {
    this.loadTopic(null);
  }

  async loadTopic(topic: Topic) {
    const modal = await this.modalController.create({
      component: TopicComponent,
      componentProps: {
        aTopic: topic
      }
    });
    modal.onDidDismiss().then(({ data }) => {
      if (data.topic) {
        this.setTopic(data.topic);
      }
    });
    await modal.present();
  }

  async presentToast(name: string) {
    const toast = await this.toastController.create({
      message: name + ' have been saved.',
      duration: 2000
    });
    toast.present();
  }
}
