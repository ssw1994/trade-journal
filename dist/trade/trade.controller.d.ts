import { TradeDto } from 'src/models/app.model';
import { TradeService } from './trade.service';
export declare class TradeController {
    private tradeService;
    constructor(tradeService: TradeService);
    createTrade(headers: any, trade: TradeDto): Promise<import("./schemas/trade.schema").Trade>;
    fetchTrades(headers: any, params: any): Promise<import("./schemas/trade.schema").Trade[]>;
}
