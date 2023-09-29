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
exports.PnlController = void 0;
const common_1 = require("@nestjs/common");
const pnl_service_1 = require("./pnl.service");
const app_model_1 = require("../models/app.model");
let PnlController = class PnlController {
    constructor(pnlService) {
        this.pnlService = pnlService;
    }
    async pnlStateMent(headers, params) {
        const token = headers['authorization'];
        return await this.pnlService.getPnlStatements(token, params);
    }
    async savePnl(headers, payload) {
        const token = headers['authorization'];
        return await this.pnlService.savePnl(token, payload);
    }
};
__decorate([
    (0, common_1.Get)('statement'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PnlController.prototype, "pnlStateMent", null);
__decorate([
    (0, common_1.Post)('save'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, app_model_1.createPnlDto]),
    __metadata("design:returntype", Promise)
], PnlController.prototype, "savePnl", null);
PnlController = __decorate([
    (0, common_1.Controller)('pnl'),
    __metadata("design:paramtypes", [pnl_service_1.PnlService])
], PnlController);
exports.PnlController = PnlController;
//# sourceMappingURL=pnl.controller.js.map