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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeSchema = exports.Trade = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../user/schemas/user.schema");
const app_model_1 = require("../../models/app.model");
let Trade = class Trade {
};
__decorate([
    (0, mongoose_1.Prop)({
        default: Date.now(),
    }),
    __metadata("design:type", Date)
], Trade.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", user_schema_1.User)
], Trade.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Trade.prototype, "strikePrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: app_model_1.TradeType }),
    __metadata("design:type", String)
], Trade.prototype, "trade", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: app_model_1.TradeOption }),
    __metadata("design:type", String)
], Trade.prototype, "option", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: app_model_1.TradeIndex }),
    __metadata("design:type", String)
], Trade.prototype, "index", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Trade.prototype, "transactionPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Trade.prototype, "slots", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Trade.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Trade.prototype, "comments", void 0);
Trade = __decorate([
    (0, mongoose_1.Schema)()
], Trade);
exports.Trade = Trade;
exports.TradeSchema = mongoose_1.SchemaFactory.createForClass(Trade);
//# sourceMappingURL=trade.schema.js.map