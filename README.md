# RealisticDatabase

## Notes

- As of now, I did not add built-in encryption for data. I may add this in the future as an optional feature. Our current reason for doing this is because not everyone wants/needs encrypted data and encrypting it yourself is farily simple, and I'm yet to have time to add it.

## Installation
`npm i realistic-database`

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
## Version 1.1.0
- Added NPM page to menu
- Switched fron tarball install to `npm i realistic-database`

## Version 1.0.1
- Changed behaviour of forceOverwrite for `put`, it previously checked if the key existed, not the value in the key. This was made before I decided to do keys as arrays of entries.
- Added `@example` fields to all JSDocs.
- Added [GitHub Repo](https://github.com/iiRealisticDev/realistic-database) link.
- Added to NPM

## Version 1.0.0

- Release, everything on here is new. Read the [documentation](https://iirealisticdev.github.io/realistic-database/index.html) for help.


## Links
[Source - GitHub](https://github.com/iiRealisticDev/realistic-database)
[npm](https://www.npmjs.com/package/realistic-database)