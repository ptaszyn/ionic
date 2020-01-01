import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Topic } from 'src/app/core/models/topic.model';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  @Input() aTopic: Topic;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    if (!this.aTopic) {
      this.aTopic = {} as Topic;
    } else {
      this.aTopic = Object.assign({}, this.aTopic);
    }
  }

  save() {
    this.dismiss(this.aTopic);
  }

  cancel() {
    this.dismiss(null);
  }

  private dismiss(saveTopic: Topic) {
    this.modalController.dismiss({
      topic: saveTopic
    });
  }
}
