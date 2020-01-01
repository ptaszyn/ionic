import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopicComponent } from './topic/topic.component';
import { InformationComponent } from './information/information.component';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule],
  declarations: [TopicComponent, InformationComponent],
  exports: [TopicComponent, InformationComponent],
  entryComponents: [TopicComponent, InformationComponent]
})
export class SharedModule {}
