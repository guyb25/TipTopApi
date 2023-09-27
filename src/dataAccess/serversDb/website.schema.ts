import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, model } from 'mongoose';

export type WebsiteDocument = HydratedDocument<Website>;

@Schema()
export class Website {
  constructor(
    name: string,
    username: string,
    password: string,
    category: string,
    tags: string[],
    description: string,
    email: string,
    link: string,
    votes: number,
  ) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.category = category;
    this.tags = tags;
    this.description = description;
    this.email = email;
    this.link = link;
    this.votes = votes;
  }

  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  tags: string[];

  @Prop()
  description: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  votes: number;
}

export const WebsiteModel = model(
  'Webiste',
  SchemaFactory.createForClass(Website),
);
