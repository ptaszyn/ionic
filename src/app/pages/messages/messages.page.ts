import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/core/models/topic.model';
import { MessagesService } from 'src/app/core/services/messages.service';
import { ModalController, ToastController } from '@ionic/angular';
import { TopicComponent } from 'src/app/shared/topic/topic.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss']
})
export class MessagesPage implements OnInit {
  public topics: Topic[];

  constructor(
    private messagesService: MessagesService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadTopics();
  }

  loadTopics() {
    this.messagesService.getTopics().then(topics => {
      this.topics = topics;
    });
  }

  setTopic(topic: Topic) {
    this.messagesService.setTopic(topic).then(() => {
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
      if (data && data.topic) {
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
