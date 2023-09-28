import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { TimeFrame, createPnlDto } from 'src/models/app.model';
import { Pnl } from './schema/pnl.schema';
import { UtilityService } from 'src/shared/services/utility.service';
import * as moment from 'moment';
@Injectable()
export class PnlService {
  constructor(
    @InjectModel(Pnl.name) private pnlModel: Model<Pnl>,
    private utilityService: UtilityService,
  ) {}

  async getFilteredPnlStatements(id, params): Promise<Pnl[]> {
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
      moreFilter = {
        ...moreFilter,
        $group: {
          _id: { $month: '$date' },
        },
      };
    }
    const filter = {
      userId: id,
      ...moreFilter,
    };
    return await this.pnlModel.aggregate([
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
          date: 1,
          amount: 1,
        },
      },
      {
        $group: {
          _id: moreFilter?.$group?._id ?? '$date',
          amount: { $sum: '$amount' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
  }

  async getPnlStatements(token: string, params: TimeFrame) {
    const _id: string = this.utilityService.getIdFromToken(token);
    if (params && Object.values(params).length > 0) {
      return await this.getFilteredPnlStatements(_id, params);
    }
    return await this.pnlModel.find({
      userId: new mongoose.Types.ObjectId(_id),
    });
  }

  async savePnl(token: string, payload: createPnlDto): Promise<Pnl> {
    const _id: string = this.utilityService.getIdFromToken(token);
    const pnl = new this.pnlModel({ ...payload, userId: _id });
    return await pnl.save();
  }
}
