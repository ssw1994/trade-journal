import { Module } from '@nestjs/common';
import { PnlService } from './pnl.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pnl, PnlSchema } from './schema/pnl.schema';
import { PnlController } from './pnl.controller';
import { UtilityService } from '../shared/services/utility.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pnl.name, schema: PnlSchema }])],
  providers: [PnlService, UtilityService],
  controllers: [PnlController],
})
export class PnlModule {}
