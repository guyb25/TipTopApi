import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { model } from 'mongoose';

@Schema()
export class Vote {
  constructor(ip: string, time: Date, websiteId: string) {
    this.ip = ip;
    this.time = time;
    this.websiteId = websiteId;
  }

  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  time: Date;

  @Prop({ required: true })
  websiteId: string;
}

export const VoteModel = model('Vote', SchemaFactory.createForClass(Vote));
