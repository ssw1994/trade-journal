import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { PnlService } from './pnl.service';
import { createPnlDto } from 'src/models/app.model';

@Controller('pnl')
export class PnlController {
  constructor(private pnlService: PnlService) {}

  @Get('statement')
  async pnlStateMent(@Headers() headers, @Query() params) {
    const token = headers['authorization'];
    return await this.pnlService.getPnlStatements(token, params);
  }

  @Post('save')
  async savePnl(@Headers() headers, @Body() payload: createPnlDto) {
    const token = headers['authorization'];
    return await this.pnlService.savePnl(token, payload);
  }
}
