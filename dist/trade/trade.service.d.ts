import { DateRange, TradeDto } from 'src/models/app.model';
import { Trade } from './schemas/trade.schema';
import mongoose, { Model } from 'mongoose';
import { UtilityService } from 'src/shared/services/utility.service';
export declare class TradeService {
    private tradeModel;
    private utilityService;
    constructor(tradeModel: Model<Trade>, utilityService: UtilityService);
    createTrade(trade: TradeDto, token: string): Promise<Trade>;
    getFilteredTrades(id: any, params: any): Promise<Trade[]>;
    fetchTrades(token: string, params: DateRange): Promise<Trade[]>;
    deleteTrade(id: string): Promise<Trade>;
    updateTrde(id: any, payload: TradeDto): Promise<mongoose.Document<unknown, {}, Trade> & Trade & {
        _id: mongoose.Types.ObjectId;
    }>;
}
