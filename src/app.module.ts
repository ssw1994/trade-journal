import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TradeController } from './trade/trade.controller';
import { TradeService } from './trade/trade.service';
import { TradeModule } from './trade/trade.module';
import { UserModule } from './user/user.module';
import { UtilityService } from './shared/services/utility.service';
import { PnlModule } from './pnl/pnl.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://esachin:Complex@1994@cluster0.xd6pt.mongodb.net/?retryWrites=true&w=majority',
    ),
    TradeModule,
    UserModule,
    PnlModule,
  ],
  controllers: [AppController],
  providers: [AppService, UtilityService],
})
export class AppModule {}
