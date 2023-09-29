import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
@Schema()
export class Pnl {
  @Prop({ required: true })
  amount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true })
  userId: User;

  @Prop({ type: Date })
  date: Date;
}

export type PnlDocument = HydratedDocument<Pnl>;
export const PnlSchema = SchemaFactory.createForClass(Pnl);
