"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const trade_schema_1 = require("./schemas/trade.schema");
const mongoose_2 = require("mongoose");
const utility_service_1 = require("../shared/services/utility.service");
const moment = require("moment");
let TradeService = class TradeService {
    constructor(tradeModel, utilityService) {
        this.tradeModel = tradeModel;
        this.utilityService = utilityService;
    }
    async createTrade(trade, token) {
        const _id = this.utilityService.getIdFromToken(token);
        console.log(_id);
        const newTrade = new this.tradeModel(Object.assign(Object.assign({}, trade), { userId: new mongoose_2.default.Types.ObjectId(_id) }));
        return newTrade.save();
    }
    async getFilteredTrades(id, params) {
        const { fromDate, toDate, date, previousMonth, previewWeek, previousYear, currentMonth, currentYear, currentWeek, } = params;
        const toISODate = (date) => {
            return new Date(date.toDate());
        };
        let moreFilter = null;
        if (fromDate && toDate) {
            moreFilter = {
                date: {
                    $gte: toISODate(moment(fromDate).startOf('day')),
                    $lte: toISODate(moment(toDate).endOf('day')),
                },
            };
        }
        if (date) {
            moreFilter = {
                date: {
                    $gte: toISODate(moment(date).startOf('day')),
                    $lte: toISODate(moment(date).endOf('day')),
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
        const filter = Object.assign({ userId: id }, moreFilter);
        return await this.tradeModel.aggregate([
            {
                $match: {
                    $and: [
                        { userId: new mongoose_2.default.Types.ObjectId(filter.userId) },
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
    async fetchTrades(token, params) {
        const _id = this.utilityService.getIdFromToken(token);
        if (params && Object.values(params).length > 0) {
            return await this.getFilteredTrades(_id, params);
        }
        return await this.tradeModel.find({
            userId: new mongoose_2.default.Types.ObjectId(_id),
        });
    }
    async deleteTrade(id) {
        return await this.tradeModel.findByIdAndDelete(id);
    }
    async updateTrde(id, payload) {
        return await this.tradeModel.findByIdAndUpdate(id, payload);
    }
};
TradeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(trade_schema_1.Trade.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        utility_service_1.UtilityService])
], TradeService);
exports.TradeService = TradeService;
//# sourceMappingURL=trade.service.js.map