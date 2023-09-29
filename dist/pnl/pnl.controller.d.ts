import { PnlService } from './pnl.service';
import { createPnlDto } from 'src/models/app.model';
export declare class PnlController {
    private pnlService;
    constructor(pnlService: PnlService);
    pnlStateMent(headers: any, params: any): Promise<import("./schema/pnl.schema").Pnl[]>;
    savePnl(headers: any, payload: createPnlDto): Promise<import("./schema/pnl.schema").Pnl>;
}
