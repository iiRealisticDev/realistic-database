import { DBFile } from "./utils.js";
export declare class RealisticDatabase {
    dbPath: string;
    /**
     * @summary Create a database.
     * @description Creates a database at the given path, and presents the necessary methods to interact with it.
     * @param {string} dbDir A path to the directory the DB should be in.
     * @param {DBFile} dbFile A file where the DB should be stored. Must be JSON.
     * @example
     * const db = new RealisticDatabase("./db", new DBFile("db.json", "{}"));
     */
    constructor(dbDir: string, dbFile: DBFile);
    /**
     * @summary Returns the full database.
     * @description This is used to write to the database using [put](#put), and and return information using [get](#get).
     * @returns {Record<string, unknown[]>} A JSON object representing the database.
     * @example
     * const db = db.read();
     */
    read(): Record<string, unknown[]>;
    /**
     * @summary Saves the new information to the file.
     * @description This is used interally with the [put](#put) method, however is usable otherwise if needed.
     * @param {Record<string, unknown[]>} newJson The JSON to write to the file.
     * @example
     * db.save();
     */
    save(newJson: Record<string, unknown[]>): void;
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
    put(key: string, value: unknown, forceOverwrite?: boolean): void;
    /**
     * @summary Returns a value from the database.
     * @description This will return the value assigned to the key, or `null` if no value is assigned.
     * @param {string} key
     * @param {validatorFunc} validator
     * @returns The data assigned to the key or `null`.
     * @example
     * db.get("people", (value) => value.name === "John" && value.age == 21);
     */
    get(key: string, validator: (value: any) => boolean): any | null;
    /**
     * @summary Remove an entry from a database key.
     * @description This will remove the value from the database key, and automatically save the changes.
     * @param {string} key The key the value is under.
     * @param {validatorFunc} validator This will be used to determine the value to remove.
     * @returns True if removed, false if not.
     * @example
     * db.remove("people", (value) => value.name === "John");
     */
    remove(key: string, validator: (value: any) => boolean): boolean;
}
export default RealisticDatabase;
/**
 * @summary A validator for the key.
 * @description This will perform a check on the value and return whether or not the value meets the requirements.
 * @callback validatorFunc
 * @param {unknown} value The value to validate.
 * @returns {boolean} A boolean indicating whether the value is valid. True if valid, false if not.
 */
//# sourceMappingURL=database.d.ts.map