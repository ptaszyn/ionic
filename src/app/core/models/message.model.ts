import { Information } from './information.model';
export interface Message {
  topic: string;
  topicName: string;
  time: string;
  informations: Array<Information>;
}
