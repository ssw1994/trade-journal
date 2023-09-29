import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
export declare class Pnl {
    amount: number;
    userId: User;
    date: Date;
}
export type PnlDocument = HydratedDocument<Pnl>;
export declare const PnlSchema: mongoose.Schema<Pnl, mongoose.Model<Pnl, any, any, any, mongoose.Document<unknown, any, Pnl> & Pnl & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Pnl, mongoose.Document<unknown, {}, Pnl> & Pnl & {
    _id: mongoose.Types.ObjectId;
}>;
