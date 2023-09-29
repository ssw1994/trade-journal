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
exports.PnlService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const pnl_schema_1 = require("./schema/pnl.schema");
const utility_service_1 = require("../shared/services/utility.service");
const moment = require("moment");
let PnlService = class PnlService {
    constructor(pnlModel, utilityService) {
        this.pnlModel = pnlModel;
        this.utilityService = utilityService;
    }
    async getFilteredPnlStatements(id, params) {
        var _a, _b;
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
            moreFilter = Object.assign(Object.assign({}, moreFilter), { $group: {
                    _id: { $month: '$date' },
                } });
        }
        const filter = Object.assign({ userId: id }, moreFilter);
        return await this.pnlModel.aggregate([
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
                    date: 1,
                    amount: 1,
                },
            },
            {
                $group: {
                    _id: (_b = (_a = moreFilter === null || moreFilter === void 0 ? void 0 : moreFilter.$group) === null || _a === void 0 ? void 0 : _a._id) !== null && _b !== void 0 ? _b : '$date',
                    amount: { $sum: '$amount' },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);
    }
    async getPnlStatements(token, params) {
        const _id = this.utilityService.getIdFromToken(token);
        if (params && Object.values(params).length > 0) {
            return await this.getFilteredPnlStatements(_id, params);
        }
        return await this.pnlModel.find({
            userId: new mongoose_2.default.Types.ObjectId(_id),
        });
    }
    async savePnl(token, payload) {
        const _id = this.utilityService.getIdFromToken(token);
        const pnl = new this.pnlModel(Object.assign(Object.assign({}, payload), { userId: _id }));
        return await pnl.save();
    }
};
PnlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(pnl_schema_1.Pnl.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        utility_service_1.UtilityService])
], PnlService);
exports.PnlService = PnlService;
//# sourceMappingURL=pnl.service.js.map