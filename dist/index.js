"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = exports.RealisticDatabase = void 0;
const database_1 = __importDefault(require("./modules/database"));
var database_2 = require("./modules/database");
Object.defineProperty(exports, "RealisticDatabase", { enumerable: true, get: function () { return database_2.RealisticDatabase; } });
var utils_1 = require("./modules/utils");
Object.defineProperty(exports, "File", { enumerable: true, get: function () { return utils_1.File; } });
exports.default = {
    RealisticDatabase: database_1.default,
    File,
};
