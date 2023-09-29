import moment from 'moment';
export declare enum TradeType {
    buy = "BUY",
    sell = "SELL"
}
export declare enum TradeOption {
    put = "PUT",
    call = "CALL"
}
export declare enum TradeIndex {
    nifty = "NIFTY",
    bankNifty = "BANKNIFTY",
    finnifty = "FINNIFTY"
}
export declare class SignInDto {
    username: string;
    password: string;
    mobile: number;
    premium: boolean;
}
export declare class LoginDto {
    username: string;
    password: string;
}
export declare class TradeDto {
    strikePrice: number;
    trade: TradeType;
    option: TradeOption;
    transactionPrice: number;
    index: TradeIndex;
    slots: number;
    comments: string;
}
export interface DateRange {
    currentMonth?: boolean;
    previousMonth?: boolean;
    currentWeek?: boolean;
    previousWeek?: boolean;
    currentYear?: boolean;
    previousYear?: boolean;
    fromDate?: moment.Moment | Date | string;
    toDate?: moment.Moment | Date | string;
    date?: moment.Moment | Date | string;
}
export type TimeFrame = 'previousWeek' | 'currentWeek' | 'previousMonth' | 'currentMonth' | 'previousYear' | 'currentYear' | 'lastDay';
export declare class createPnlDto {
    date: string;
    amount: number;
}
