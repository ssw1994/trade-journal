"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PnlModule = void 0;
const common_1 = require("@nestjs/common");
const pnl_service_1 = require("./pnl.service");
const mongoose_1 = require("@nestjs/mongoose");
const pnl_schema_1 = require("./schema/pnl.schema");
const pnl_controller_1 = require("./pnl.controller");
const utility_service_1 = require("../shared/services/utility.service");
let PnlModule = class PnlModule {
};
PnlModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: pnl_schema_1.Pnl.name, schema: pnl_schema_1.PnlSchema }])],
        providers: [pnl_service_1.PnlService, utility_service_1.UtilityService],
        controllers: [pnl_controller_1.PnlController],
    })
], PnlModule);
exports.PnlModule = PnlModule;
//# sourceMappingURL=pnl.module.js.map