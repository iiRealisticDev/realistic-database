"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealisticDatabase = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const utils_js_1 = require("./utils.js");
class RealisticDatabase {
    /**
     * @summary Create a database.
     * @description Creates a database at the given path, and presents the necessary methods to interact with it.
     * @param {string} dbDir A path to the directory the DB should be in.
     * @param {File} dbFile A file where the DB should be stored. Must be JSON.
     */
    constructor(dbDir, dbFile) {
        if (!(dbFile instanceof utils_js_1.File))
            throw new Error("Database file must be a File.");
        if (!dbFile.name.endsWith(".json"))
            throw new Error("Database file must be JSON.");
        try {
            (0, utils_js_1.makeDir)(dbDir, dbFile);
        }
        catch (err) {
            throw new Error("Could not create database directory.\n\n" + err);
        }
        this.dbPath = `${dbDir}/${dbFile.name}`;
    }
    /**
     * @summary Returns the full database.
     * @description This is used to write to the database using [put](#put), and and return information using [get](#get).
     * @returns {Record<string, unknown[]>} A JSON object representing the database.
     */
    read() {
        return (0, utils_js_1.readDB)(this.dbPath);
    }
    /**
     * @summary Saves the new information to the file.
     * @description This is used interally with the [put](#put) method, however is usable otherwise if needed.
     * @param {Record<string, unknown[]>} newJson The JSON to write to the file.
     */
    save(newJson) {
        (0, utils_js_1.writeDB)(this.dbPath, newJson);
    }
    /**
     * @summary Add a value to the database.
     * @description This adds a value to the database and automatically saves the changes.
     * @param {string} key The key to store it under.
     * @param {unknown} value The value to store.
     * @param {boolean} forceOverwrite A boolean indicating whether to overwrite the database entry if it already exists, `true` by default.
     */
    put(key, value, forceOverwrite = true) {
        if (typeof key !== "string")
            throw new Error("Key must be a string.");
        const db = this.read();
        if (db[key] && !forceOverwrite)
            throw new Error("Key already exists and forceOverwrite is disabled.");
        if (!db[key])
            db[key] = [];
        db[key].push(value);
        this.save(db);
    }
    /**
     * @summary Returns a value from the database.
     * @description This will return the value assigned to the key, or `null` if no value is assigned.
     * @param {string} key
     * @param {validatorFunc} validator
     * @returns The data assigned to the key or `null`.
     */
    get(key, validator) {
        const db = this.read();
        if (!db[key])
            return null;
        if (validator) {
            const valid = db[key].filter(validator);
            if (valid.length === 0)
                return null;
            return valid[0];
        }
    }
}
exports.RealisticDatabase = RealisticDatabase;
exports.default = RealisticDatabase;
/**
 * @summary A validator for the key.
 * @description This will perform a check on the value and return whether or not the value meets the requirements.
 * @callback validatorFunc
 * @param {unknown} value The value to validate.
 * @returns {boolean} A boolean indicating whether the value is valid. True if valid, false if not.
 */
