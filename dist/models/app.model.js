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
exports.createPnlDto = exports.TradeDto = exports.LoginDto = exports.SignInDto = exports.TradeIndex = exports.TradeOption = exports.TradeType = void 0;
const class_validator_1 = require("class-validator");
var TradeType;
(function (TradeType) {
    TradeType["buy"] = "BUY";
    TradeType["sell"] = "SELL";
})(TradeType = exports.TradeType || (exports.TradeType = {}));
var TradeOption;
(function (TradeOption) {
    TradeOption["put"] = "PUT";
    TradeOption["call"] = "CALL";
})(TradeOption = exports.TradeOption || (exports.TradeOption = {}));
var TradeIndex;
(function (TradeIndex) {
    TradeIndex["nifty"] = "NIFTY";
    TradeIndex["bankNifty"] = "BANKNIFTY";
    TradeIndex["finnifty"] = "FINNIFTY";
})(TradeIndex = exports.TradeIndex || (exports.TradeIndex = {}));
class SignInDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignInDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsStrongPassword)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SignInDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SignInDto.prototype, "mobile", void 0);
exports.SignInDto = SignInDto;
class LoginDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
exports.LoginDto = LoginDto;
class TradeDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TradeDto.prototype, "strikePrice", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(TradeType),
    __metadata("design:type", String)
], TradeDto.prototype, "trade", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(TradeOption),
    __metadata("design:type", String)
], TradeDto.prototype, "option", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TradeDto.prototype, "transactionPrice", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEnum)(TradeIndex),
    __metadata("design:type", String)
], TradeDto.prototype, "index", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TradeDto.prototype, "slots", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TradeDto.prototype, "comments", void 0);
exports.TradeDto = TradeDto;
class createPnlDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createPnlDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], createPnlDto.prototype, "amount", void 0);
exports.createPnlDto = createPnlDto;
//# sourceMappingURL=app.model.js.map