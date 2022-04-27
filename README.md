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
// Import the databse and DBFile class
import { RealisticDatabase, DBFile } from "realistic-database";

// Make a database in `./database` with the name `database.json` and content `{}`
const db = new RealisticDatabase("./database", new DBFile("database.json","{}"));

// Add an entry to the key `abc` with the value `{a: "b", c: "d"}`. Multiple entries can exist under one key.
db.put("abc", {a: "b", c: "d"});

// Get an entry from the key `abc` where the entry is an object with the property `a` set to `"b"`.
const dbEntry = db.get("abc", (entry) => entry.a == "b");

// Log the entry
console.log(dbEntry);

// Delete the same entry
const del = db.remove("abc", (entry) => entry.a == "b");

// Log the deletion status, true if it was deleted, false if not.
console.log(del);

// Confirm removal by attempting to get it and logging the output.
const dbEntryRemoved = db.get("abc", (entry) => entry.a == "b");

console.log(dbEntryRemoved)

/*
Expected output:
{ a: 'b', c: 'd' }
true
null
*/
```

## Credits

- Package created by iiRealistic_Dev
- We use [JSDoc](https://jsdoc.app/) to generate this documentation.
- We use [clean-jsdoc-theme](https://github.com/ankitskvmdam/clean-jsdoc-theme) to make the documentation look as nice as it does.

# Changelogs

## Changelog 1

- Release, everything on here is new. Read the [documentation](https://iirealisticdev.github.io/realistic-database/index.html) for help.
