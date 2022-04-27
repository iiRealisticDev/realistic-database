# RealisticDatabase

## Notes

- As of now, I did not add built-in encryption for data. I may add this in the future as an optional feature. Our current reason for doing this is because not everyone wants/needs encrypted data and encrypting it yourself is farily simple, and I'm yet to have time to add it.

## Installation
If you are now finding this project as I made it public, you **must** install via the `.tgz` file. You can download the `.tgz` file from [here](https://github.com/iiRealisticDev/realistic-database/blob/main/realistic-database-1.0.0.tgz) and install it into your project with:
```shell
npm i path/to/realistic-database-1.0.0.tgz
```
or you can install it from the raw version of the `.tgz` file on the repo, note that the `?raw=true` must be present, otherwise npm will not install it:
```shell
npm i https://github.com/iiRealisticDev/realistic-database/blob/main/realistic-database-1.0.0.tgz?raw=true
```

## Code Example 
```typescript
import { RealisticDatabase, DBFile } from "realistic-database";

// Create a new database. The first argument is the directory
// The second argument is a File object that represents the database file name & content.
const db = new RealisticDatabase("./database", new DBFile("database.json", "{}"));

// Make an entry to the database. Can be any JSON-valid key-value pair.
db.put("abc", {a: "b", c: "d"});

// Get an entry from the database. The validator can be any sort of validator, but in this example we used a simple one.
const dbEntry = db.get("abc", (entry) => entry.a == "b")

console.log(dbEntry)
```

## Credits

- Package created by iiRealistic_Dev
- We use [JSDoc](https://jsdoc.app/) to generate this documentation.
- We use [clean-jsdoc-theme](https://github.com/ankitskvmdam/clean-jsdoc-theme) to make the documentation look as nice as it does.

# Changelogs

## Changelog 1

- Release, everything on here is new. Read the [documentation](https://iirealisticdev.github.io/realistic-database/index.html) for help.
