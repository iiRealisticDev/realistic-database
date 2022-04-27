"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBFile = exports.RealisticDatabase = void 0;
const database_1 = __importDefault(require("./modules/database"));
const utils_1 = require("./modules/utils");
var database_2 = require("./modules/database");
Object.defineProperty(exports, "RealisticDatabase", { enumerable: true, get: function () { return database_2.RealisticDatabase; } });
var utils_2 = require("./modules/utils");
Object.defineProperty(exports, "DBFile", { enumerable: true, get: function () { return utils_2.DBFile; } });
exports.default = {
    RealisticDatabase: database_1.default,
    DBFile: utils_1.DBFile,
};
