import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { TimeFrame } from 'src/models/app.model';
@Injectable()
export class UtilityService {
  public getIdFromToken(token: string) {
    const tokenParts = token.split(' ');
    if (tokenParts?.length >= 2) {
      return tokenParts[1];
    }
    return null;
  }

  getTimeBoundTrades(timeFrame: TimeFrame) {
    let dates: any;

    const toISODate = (date: moment.Moment | string) => {
      console.log(date);
      if (typeof date === 'string') {
        return new Date(date);
      }
      return new Date(date.toDate());
    };
    switch (timeFrame) {
      case 'currentWeek':
        dates = {
          date: {
            $gte: toISODate(moment().startOf('week')),
            $lte: toISODate(moment().endOf('week')),
          },
        };
        break;
      case 'previousWeek':
        dates = {
          date: {
            $gte: toISODate(moment().subtract(1, 'week').startOf('day')),
            $lte: toISODate(moment().subtract(1, 'week').endOf('day')),
          },
        };
        break;
      case 'currentMonth':
        dates = {
          date: {
            $gte: toISODate(
              moment().startOf('month').format('YYYY-MM-DD').toString(),
            ),
            $lte: toISODate(
              moment().endOf('month').format('YYYY-MM-DD').toString(),
            ),
          },
        };
        console.log('Test ->', dates);
        break;
      case 'previousMonth':
        dates = {
          date: {
            $gte: toISODate(moment().subtract(1, 'month').startOf('month')),
            $lte: toISODate(moment().subtract(1, 'month').endOf('month')),
          },
        };
        break;
      case 'currentYear':
        dates = {
          date: {
            $gte: toISODate(moment().startOf('year')),
            $lte: toISODate(moment().endOf('year')),
          },
        };
        break;
      case 'previousYear':
        dates = {
          date: {
            $gte: toISODate(moment().subtract(1, 'year').startOf('day')),
            $lte: toISODate(moment().subtract(1, 'year').endOf('day')),
          },
        };
        break;
      case 'lastDay':
        dates = {
          date: {
            $gte: toISODate(moment().subtract(1, 'day').startOf('day')),
            $lte: toISODate(moment().subtract(1, 'day').endOf('day')),
          },
        };
        break;
    }
    return dates;
  }
}
