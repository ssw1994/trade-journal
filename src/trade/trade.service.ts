import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DateRange, TradeDto } from 'src/models/app.model';
import { Trade } from './schemas/trade.schema';
import mongoose, { Model, ObjectId } from 'mongoose';
import { UtilityService } from 'src/shared/services/utility.service';
import * as moment from 'moment';

@Injectable()
export class TradeService {
  constructor(
    @InjectModel(Trade.name) private tradeModel: Model<Trade>,
    private utilityService: UtilityService,
  ) {}

  async createTrade(trade: TradeDto, token: string): Promise<Trade> {
    const _id: string = this.utilityService.getIdFromToken(token);
    console.log(_id);
    const newTrade = new this.tradeModel({
      ...trade,
      userId: new mongoose.Types.ObjectId(_id),
    });
    return newTrade.save();
  }

  async getFilteredTrades(id, params): Promise<Trade[]> {
    const {
      fromDate,
      toDate,
      date,
      previousMonth,
      previewWeek,
      previousYear,
      currentMonth,
      currentYear,
      currentWeek,
    } = params;

    const toISODate = (date: moment.Moment) => {
      return new Date(date.toDate());
    };

    let moreFilter = null;
    if (fromDate && toDate) {
      moreFilter = {
        date: {
          $gte: toISODate(moment(<string>fromDate).startOf('day')),
          $lte: toISODate(moment(<string>toDate).endOf('day')),
        },
      };
    }

    if (date) {
      moreFilter = {
        date: {
          $gte: toISODate(moment(<string>date).startOf('day')),
          $lte: toISODate(moment(<string>date).endOf('day')),
        },
      };
    }

    if (previewWeek) {
      moreFilter = this.utilityService.getTimeBoundTrades('previousWeek');
    }

    if (previousMonth) {
      moreFilter = this.utilityService.getTimeBoundTrades('previousMonth');
    }

    if (previousYear) {
      moreFilter = this.utilityService.getTimeBoundTrades('previousYear');
    }

    if (currentMonth) {
      moreFilter = this.utilityService.getTimeBoundTrades('currentMonth');
    }

    if (currentWeek) {
      moreFilter = this.utilityService.getTimeBoundTrades('currentWeek');
    }

    if (currentYear) {
      moreFilter = this.utilityService.getTimeBoundTrades('currentYear');
    }
    const filter = {
      userId: id,
      ...moreFilter,
    };
    return await this.tradeModel.aggregate([
      {
        $match: {
          $and: [
            { userId: new mongoose.Types.ObjectId(filter.userId) },
            { date: { $gte: filter.date.$gte, $lte: filter.date.$lte } },
          ],
        },
      },
      {
        $project: {
          slots: 1,
          transationPrice: 1,
          index: 1,
          trade: 1,
        },
      },
      {
        $group: {
          _id: { index: '$index', trade: '$trade' },
          total: { $sum: { $multiply: ['$transactionPrice', '$slots'] } },
        },
      },
    ]);
  }

  async fetchTrades(token: string, params: DateRange): Promise<Trade[]> {
    const _id: string = this.utilityService.getIdFromToken(token);
    if (params && Object.values(params).length > 0) {
      return await this.getFilteredTrades(_id, params);
    }
    return await this.tradeModel.find({
      userId: new mongoose.Types.ObjectId(_id),
    });
  }

  async deleteTrade(id: string): Promise<Trade> {
    return await this.tradeModel.findByIdAndDelete(id);
  }

  async updateTrde(id, payload: TradeDto) {
    return await this.tradeModel.findByIdAndUpdate(id, payload);
  }
}
