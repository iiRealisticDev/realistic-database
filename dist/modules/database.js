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
     * @param {DBFile} dbFile A file where the DB should be stored. Must be JSON.
     * @example
     * const db = new RealisticDatabase("./db", new DBFile("db.json", "{}"));
     */
    constructor(dbDir, dbFile) {
        if (!(dbFile instanceof utils_js_1.DBFile))
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
     * @example
     * const db = db.read();
     */
    read() {
        return (0, utils_js_1.readDB)(this.dbPath);
    }
    /**
     * @summary Saves the new information to the file.
     * @description This is used interally with the [put](#put) method, however is usable otherwise if needed.
     * @param {Record<string, unknown[]>} newJson The JSON to write to the file.
     * @example
     * db.save();
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
     * @example
     * // Put an entry into "people" with the name John and age 21
     * // But not if it already exists.
     * db.put("people", { name: "John", age: 21 }, false);
     */
    put(key, value, forceOverwrite = true) {
        if (typeof key !== "string")
            throw new Error("Key must be a string.");
        const db = this.read();
        if (db[key].includes(value) && !forceOverwrite)
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
     * @example
     * db.get("people", (value) => value.name === "John" && value.age == 21);
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
    /**
     * @summary Remove an entry from a database key.
     * @description This will remove the value from the database key, and automatically save the changes.
     * @param {string} key The key the value is under.
     * @param {validatorFunc} validator This will be used to determine the value to remove.
     * @returns True if removed, false if not.
     * @example
     * db.remove("people", (value) => value.name === "John");
     */
    remove(key, validator) {
        const db = this.read();
        if (!db[key])
            throw new Error(`Could not find ${key} in database.`);
        const valid = db[key].filter(validator);
        if (valid.length === 0)
            return false;
        db[key].splice(db[key].indexOf(valid[0]), 1);
        this.save(db);
        return true;
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
