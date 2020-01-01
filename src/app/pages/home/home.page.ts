import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/core/services/messages.service';
import { Message } from 'src/app/core/models/message.model';
import { Information } from 'src/app/core/models/information.model';
import { ModalController } from '@ionic/angular';
import { InformationComponent } from 'src/app/shared/information/information.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public messages: Array<Message>;

  constructor(private messagesService: MessagesService, private modalController: ModalController) {}

  ngOnInit() {
    this.loadMessages();
  }

  private async loadMessages() {
    await this.messagesService.getMessages().then(data => {
      data.sort((a, b) => (a.time <= b.time ? 1 : -1));
      this.messages = data;
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.loadMessages();
      event.target.complete();
    }, 2000);
  }

  async loadInformation(message: Message, information: Information) {
    const modal = await this.modalController.create({
      component: InformationComponent,
      componentProps: {
        aInformation: information,
        aMessage: message
      }
    });
    await modal.present();
  }
}
