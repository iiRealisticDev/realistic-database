import fs from "fs";

export class DBFile {
  name: string;
  content: string;
  /**
   * @summary Construct a File for usage in the database.
   * @description This can also just be a simple object of `{name: "", content: ""}`, however this was made for ease of use.
   * @param {string} name The name of the file.
   * @param {string} content The content of the file.
   */
  constructor(name: string, content: string) {
    try {
      JSON.parse(content);
    } catch (err: unknown) {
      throw new Error(String(err) ?? "An unknown error occurred.");
    }
    this.name = name;
    this.content = content;
  }
}

/**
 * @summary Make a directory with files.
 * @description Used to create the database file and necessary directories.
 * @param {string} dir The directory to create the file in.
 * @param {DBFile} file The file to create.
 * @param {boolean} [forceOverwrite=false] A boolean indicating whether to overwrite the database if it already exists. False by default.
 */
export function makeDir(dir: string, file: DBFile, forceOverwrite = false) {
  if (!fs.existsSync(`${dir}/${file.name}`) && !forceOverwrite) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const content = file.content;
  const path = dir + "/" + file.name;
  fs.writeFileSync(path, content);
}

/**
 * @summary Read the entire database.
 * @description Used internally in `RealisticDatabase.read`.
 * @param {string} dbPath The path to the database.
 * @returns {Record<string,unknown[]>} The JSON Object in the DB.
 */
export function readDB(dbPath: string): Record<string,unknown[]> {
  const file = fs.readFileSync(dbPath, { encoding: "utf8" });
  const fileJSON = JSON.parse(file);
  return fileJSON;
}

/**
 * @summary Write to the DB file.
 * @description Used in [RealisticDatabase.save](./RealisticDatabase.html#put) as a shorthand.
 * @param {string} dbPath The DB path
 * @param {Record<string, unknown[]>} json The new JSON to write.
 */
export function writeDB(dbPath: string, json: Record<string, unknown[]>) {
  fs.writeFileSync(dbPath, JSON.stringify(json));
}

export * as default from "./utils";
