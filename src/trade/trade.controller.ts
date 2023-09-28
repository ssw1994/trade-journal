import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { TradeDto } from 'src/models/app.model';
import { TradeService } from './trade.service';

@Controller('trade')
export class TradeController {
  constructor(private tradeService: TradeService) {}

  @Put('add')
  @HttpCode(HttpStatus.OK)
  async createTrade(@Headers() headers, @Body() trade: TradeDto) {
    console.log(headers);
    const token = headers['authorization'];
    return await this.tradeService.createTrade(trade, token);
  }

  @Get('/')
  async fetchTrades(@Headers() headers, @Query() params) {
    try {
      const token = headers['authorization'];
      return await this.tradeService.fetchTrades(token, params);
    } catch (error) {
      console.log(error);
    }
  }
}
