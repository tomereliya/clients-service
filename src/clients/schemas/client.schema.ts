import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema()
export class Client {
  @Prop({required: true, unique: true})
  id: string;
  
  @Prop({required: true})
  fullName: string;

  @Prop({required: true})
  accountsNumbers: number[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);