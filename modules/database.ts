/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeDir, File, readDB, writeDB } from "./utils.js"; 

export class RealisticDatabase {
  dbPath: string;
  /**
   * @summary Create a database.
   * @description Creates a database at the given path, and presents the necessary methods to interact with it.
   * @param {string} dbDir A path to the directory the DB should be in.
   * @param {File} dbFile A file where the DB should be stored. Must be JSON.
   */
  constructor(dbDir: string, dbFile: File) {
    if (!(dbFile instanceof File)) throw new Error("Database file must be a File.");
    if (!dbFile.name.endsWith(".json")) throw new Error("Database file must be JSON.");
    try {
      makeDir(dbDir, dbFile);
    } catch (err) {
      throw new Error("Could not create database directory.\n\n" + err);
    }
    this.dbPath = `${dbDir}/${dbFile.name}`;
  }
  /**
   * @summary Returns the full database.
   * @description This is used to write to the database using [put](#put), and and return information using [get](#get).
   * @returns {Record<string, unknown[]>} A JSON object representing the database.
   */
  read(): Record<string, unknown[]> {
    return readDB(this.dbPath);
  }

  /**
   * @summary Saves the new information to the file.
   * @description This is used interally with the [put](#put) method, however is usable otherwise if needed.
   * @param {Record<string, unknown[]>} newJson The JSON to write to the file.
   */
  save(newJson: Record<string, unknown[]>) {
    writeDB(this.dbPath, newJson);
  }

  /**
   * @summary Add a value to the database.
   * @description This adds a value to the database and automatically saves the changes.
   * @param {string} key The key to store it under.
   * @param {unknown} value The value to store.
   * @param {boolean} forceOverwrite A boolean indicating whether to overwrite the database if it already exists, `true` by default.
   */
  put(key: string, value: unknown, forceOverwrite = true) {
    if (typeof key !== "string") throw new Error("Key must be a string.");
    const db = this.read();
    if (db[key as keyof typeof db] && !forceOverwrite)
      throw new Error("Key already exists and forceOverwrite is disabled.");
    if (!db[key as keyof typeof db]) db[key] = [];
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
  get(key: string, validator: (value: any) => boolean): any | null {
    const db = this.read();
    if (!db[key]) return null;
    if (validator) {
      const valid = db[key].filter(validator);
      if (valid.length === 0) return null;
      return valid[0];
    }
  }
}

export default RealisticDatabase;

/**
 * @summary A validator for the key.
 * @description This will perform a check on the value and return whether or not the value meets the requirements.
 * @callback validatorFunc
 * @param {unknown} value The value to validate.
 * @returns {boolean} A boolean indicating whether the value is valid. True if valid, false if not.
 */