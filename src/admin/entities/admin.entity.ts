import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Admin extends Document {
  @Prop({
    lowercase: true,
    unique: true,
    required: true,
  })
  name: string;

  @Prop({
    lowercase: true,
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    default: new Date(),
  })
  createdAt: Date;
  updatedAt: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
