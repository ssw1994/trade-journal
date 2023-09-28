import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { TradeIndex, TradeOption, TradeType } from '../../models/app.model';
@Schema()
export class Trade {
  @Prop({
    default: Date.now(),
  })
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ required: true })
  strikePrice: number;

  @Prop({ required: true, enum: TradeType })
  trade: TradeType;

  @Prop({ required: true, enum: TradeOption })
  option: TradeOption;

  @Prop({ required: true, enum: TradeIndex })
  index: TradeIndex;

  @Prop({ required: true })
  transactionPrice: number;

  @Prop({ required: true })
  slots: number;

  @Prop()
  quantity: number;

  @Prop()
  comments: string;
}

export type TradeDocument = HydratedDocument<Trade>;

export const TradeSchema = SchemaFactory.createForClass(Trade);
