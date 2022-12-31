import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isEmail, isPhoneNumber } from 'class-validator';
import { Document } from 'mongoose';

export enum HistoryStatus {
  PICKED_UP = 'picked_up',
  IN_TRANSIT = 'in_transit',
  WAREHOUSE = 'warehouse',
  DELIVERED = 'delivered',
}

export const HistoryStatuses = Object.values(HistoryStatus);

@Schema()
export class History {
  @Prop({
    lowercase: true,
    required: true,
    enum: HistoryStatuses,
  })
  status: string;

  @Prop({
    lowercase: true,
    required: true,
  })
  description: string;

  createdAt: Date;
  updatedAt: Date;
}

@Schema({ _id: false })
export class Sender {
  @Prop({
    lowercase: true,
    required: true,
  })
  name: string;

  @Prop({
    lowercase: true,
    required: true,
    validate: [isEmail, 'Invalid Email'],
  })
  email: string;

  @Prop({
    required: true,
    validate: [isPhoneNumber, 'Invalid Phone Number'],
  })
  phone: string;
}

@Schema({ _id: false })
export class Receiver {
  @Prop({
    lowercase: true,
    required: true,
  })
  name: string;

  @Prop({
    lowercase: true,
    required: true,
    validate: [isEmail, 'Invalid Email'],
  })
  email: string;

  @Prop({
    required: true,
    validate: [isPhoneNumber, 'Invalid Phone Number'],
  })
  phone: string;
}

@Schema()
export class Package extends Document {
  @Prop({
    type: Sender,
    required: true,
  })
  sender: Sender;

  @Prop({
    type: Receiver,
    required: true,
  })
  receiver: Receiver;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    lowercase: true,
  })
  description: string;

  @Prop({
    default: false,
  })
  isDeleted: boolean;

  @Prop([History])
  history?: [History];

  createdAt: Date;
  updatedAt: Date;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
