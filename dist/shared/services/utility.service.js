"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
let UtilityService = class UtilityService {
    getIdFromToken(token) {
        const tokenParts = token.split(' ');
        if ((tokenParts === null || tokenParts === void 0 ? void 0 : tokenParts.length) >= 2) {
            return tokenParts[1];
        }
        return null;
    }
    getTimeBoundTrades(timeFrame) {
        let dates;
        const toISODate = (date) => {
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
                        $gte: toISODate(moment().startOf('month').format('YYYY-MM-DD').toString()),
                        $lte: toISODate(moment().endOf('month').format('YYYY-MM-DD').toString()),
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
};
UtilityService = __decorate([
    (0, common_1.Injectable)()
], UtilityService);
exports.UtilityService = UtilityService;
//# sourceMappingURL=utility.service.js.map