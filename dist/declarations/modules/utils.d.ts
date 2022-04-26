export declare class File {
    name: string;
    content: string;
    /**
     * @summary Construct a File for usage in the database.
     * @description This can also just be a simple object of `{name: "", content: ""}`, however this was made for ease of use.
     * @param {string} name The name of the file.
     * @param {string} content The content of the file.
     */
    constructor(name: string, content: string);
}
/**
 * @summary Make a directory with files.
 * @description Used to create the database file and necessary directories.
 * @param {string} dir The directory to create the file in.
 * @param {File} file The file to create.
 * @param {boolean} [forceOverwrite=false] A boolean indicating whether to overwrite the database if it already exists. False by default.
 */
export declare function makeDir(dir: string, file: File, forceOverwrite?: boolean): void;
/**
 * @summary Read the entire database.
 * @description Used internally in `RealisticDatabase.read`.
 * @param {string} dbPath The path to the database.
 * @returns {Record<string,unknown[]>} The JSON Object in the DB.
 */
export declare function readDB(dbPath: string): Record<string, unknown[]>;
/**
 * @summary Write to the DB file.
 * @description Used in [RealisticDatabase.save](./RealisticDatabase.html#put) as a shorthand.
 * @param {string} dbPath The DB path
 * @param {Record<string, unknown[]>} json The new JSON to write.
 */
export declare function writeDB(dbPath: string, json: Record<string, unknown[]>): void;
export * as default from "./utils";
//# sourceMappingURL=utils.d.ts.map