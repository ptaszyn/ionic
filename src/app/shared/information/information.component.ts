import { Component, OnInit, Input } from '@angular/core';
import { Information } from 'src/app/core/models/information.model';
import { Message } from 'src/app/core/models/message.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  @Input() aInformation: Information;
  @Input() aMessage: Message;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  cancel() {
    this.modalController.dismiss();
  }
}
