import { Model } from 'mongoose';
import { TimeFrame, createPnlDto } from 'src/models/app.model';
import { Pnl } from './schema/pnl.schema';
import { UtilityService } from 'src/shared/services/utility.service';
export declare class PnlService {
    private pnlModel;
    private utilityService;
    constructor(pnlModel: Model<Pnl>, utilityService: UtilityService);
    getFilteredPnlStatements(id: any, params: any): Promise<Pnl[]>;
    getPnlStatements(token: string, params: TimeFrame): Promise<Pnl[]>;
    savePnl(token: string, payload: createPnlDto): Promise<Pnl>;
}
