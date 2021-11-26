"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DatabaseModule = void 0;
var typeorm_1 = require("@nestjs/typeorm");
var common_1 = require("@nestjs/common");
var snippet_entity_1 = require("./entities/snippet.entity");
var dburl = process.env.DATABASE_URL;
common_1.Logger.log(dburl);
var DatabaseModule = /** @class */ (function () {
    function DatabaseModule() {
    }
    DatabaseModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'postgres',
                    url: dburl,
                    entities: [snippet_entity_1.Snippet],
                    synchronize: true
                }),
            ]
        })
    ], DatabaseModule);
    return DatabaseModule;
}());
exports.DatabaseModule = DatabaseModule;
