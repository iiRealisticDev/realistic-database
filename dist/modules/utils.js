"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.writeDB = exports.readDB = exports.makeDir = exports.DBFile = void 0;
const fs_1 = __importDefault(require("fs"));
class DBFile {
    /**
     * @summary Construct a File for usage in the database.
     * @description This can also just be a simple object of `{name: "", content: ""}`, however this was made for ease of use.
     * @param {string} name The name of the file.
     * @param {string} content The content of the file.
     * @example
     * const dbFile = new DBFile("db.json", "{}");
     */
    constructor(name, content) {
        var _a;
        try {
            JSON.parse(content);
        }
        catch (err) {
            throw new Error((_a = String(err)) !== null && _a !== void 0 ? _a : "An unknown error occurred.");
        }
        this.name = name;
        this.content = content;
    }
}
exports.DBFile = DBFile;
/**
 * @summary Make a directory with files.
 * @description Used to create the database file and necessary directories.
 * @param {string} dir The directory to create the file in.
 * @param {DBFile} file The file to create.
 * @param {boolean} [forceOverwrite=false] A boolean indicating whether to overwrite the database if it already exists. False by default.
 * @example
 * makeDir("./db", new DBFile("db.json", "{}"));
 */
function makeDir(dir, file, forceOverwrite = false) {
    if (!fs_1.default.existsSync(`${dir}/${file.name}`) && !forceOverwrite) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
    const content = file.content;
    const path = dir + "/" + file.name;
    fs_1.default.writeFileSync(path, content);
}
exports.makeDir = makeDir;
/**
 * @summary Read the entire database.
 * @description Used internally in `RealisticDatabase.read`.
 * @param {string} dbPath The path to the database.
 * @returns {Record<string,unknown[]>} The JSON Object in the DB.
 * @example
 * const db = readDB("./db/db.json");
 */
function readDB(dbPath) {
    const file = fs_1.default.readFileSync(dbPath, { encoding: "utf8" });
    const fileJSON = JSON.parse(file);
    return fileJSON;
}
exports.readDB = readDB;
/**
 * @summary Write to the DB file.
 * @description Used in [RealisticDatabase.save](./RealisticDatabase.html#put) as a shorthand.
 * @param {string} dbPath The DB path
 * @param {Record<string, unknown[]>} json The new JSON to write.
 * @example
 * const db = writeDB("./db/db.json", {a: "b", c: "d"});
 */
function writeDB(dbPath, json) {
    fs_1.default.writeFileSync(dbPath, JSON.stringify(json));
}
exports.writeDB = writeDB;
exports.default = __importStar(require("./utils"));
