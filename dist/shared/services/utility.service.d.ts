import { TimeFrame } from 'src/models/app.model';
export declare class UtilityService {
    getIdFromToken(token: string): string;
    getTimeBoundTrades(timeFrame: TimeFrame): any;
}
