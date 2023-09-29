import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { TradeIndex, TradeOption, TradeType } from '../../models/app.model';
export declare class Trade {
    date: Date;
    userId: User;
    strikePrice: number;
    trade: TradeType;
    option: TradeOption;
    index: TradeIndex;
    transactionPrice: number;
    slots: number;
    quantity: number;
    comments: string;
}
export type TradeDocument = HydratedDocument<Trade>;
export declare const TradeSchema: mongoose.Schema<Trade, mongoose.Model<Trade, any, any, any, mongoose.Document<unknown, any, Trade> & Trade & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Trade, mongoose.Document<unknown, {}, Trade> & Trade & {
    _id: mongoose.Types.ObjectId;
}>;
