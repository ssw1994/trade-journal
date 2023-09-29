import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import moment from 'moment';

export enum TradeType {
  buy = 'BUY',
  sell = 'SELL',
}

export enum TradeOption {
  put = 'PUT',
  call = 'CALL',
}

export enum TradeIndex {
  nifty = 'NIFTY',
  bankNifty = 'BANKNIFTY',
  finnifty = 'FINNIFTY',
}

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  @IsNumber()
  @IsOptional()
  mobile: number;

  @IsBoolean()
  @IsOptional()
  premium: boolean;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class TradeDto {
  @IsNotEmpty()
  @IsNumber()
  strikePrice: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(TradeType)
  trade: TradeType;

  @IsNotEmpty()
  @IsString()
  @IsEnum(TradeOption)
  option: TradeOption;

  @IsNotEmpty()
  @IsNumber()
  transactionPrice: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(TradeIndex)
  index: TradeIndex;

  @IsNotEmpty()
  @IsNumber()
  slots: number;

  @IsOptional()
  @IsString()
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

export type TimeFrame =
  | 'previousWeek'
  | 'currentWeek'
  | 'previousMonth'
  | 'currentMonth'
  | 'previousYear'
  | 'currentYear'
  | 'lastDay';

export class createPnlDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
