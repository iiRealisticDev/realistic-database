# RealisticDatabase

## Notes

- As of now, I did not add built-in encryption for data. I may add this in the future as an optional feature. Our current reason for doing this is because not everyone wants/needs encrypted data and encrypting it yourself is farily simple, and I'm yet to have time to add it.

## Installation
If you are now finding this repository as I made it public, you **must** install via the `.tgz` file. You can download the `.tgz` file from [here](https://github.com/iiRealisticDev/realistic-database/blob/main/realistic-database-1.0.0.tgz) and install it into your project with:
```shell`
npm i path/to/realistic-database-1.0.0.tgz
```

The below method is not yet available, but is there for when I do add the package to npm.
```shell
npm i realistic-database
```
## Code Example 

Then, if you'd like to, test this code. It's a very simple example with little practical usage, but shows how the package works. Note that the package is written in TypeScript, and so is the example as a result of such. It's relatively simple to convert it to a JavaScript file, however. Just remove the type annotations and switch `import`s to `require`.

```typescript
import { RealisticDatabase, utils } from "./index";
import { File } from "./modules/utils";

// Generally the content will be `{}` for an empty database, an empty string or invalid JSON will cause an error.
const db: RealisticDatabase = new RealisticDatabase("./data", new File("database.json", "{}"));

db.put("key", {a: "b", c: "d"}); // Adds `value` to the database, under the key `key`

const data: unknown = db.get("key", (entry) => entry.a === "b"); // Gets the data from "key" where the entry === value

console.log(data);

const allData: { [key: string]: unknown[] } = db.read(); // Gets the entire database file's content. Uncommon that you'll need this and it's mostly used internally, but may be helpful for debugging or something.

/* 
There's also a [RealisticDatabase.save()](./RealisticDatabase.html#save) method, which will save the database. 
This is automatically called when the database is updated with `put()`, however if you make manual edits you may want to. 
Generally you should not make manual edits or any edits outside of `put()` unless you know what you're doing.
This is because chances are it'll cause errors if you use `get()` on a key that isn't set up as as a database entry.
*/
console.log(allData);
```

## Credits

- Package created by iiRealistic_Dev
- We use [JSDoc](https://jsdoc.app/) to generate this documentation.
- We use [clean-jsdoc-theme](https://github.com/ankitskvmdam/clean-jsdoc-theme) to make the documentation look as nice as it does.

# Changelogs

## Changelog 1

- Release, everything on here is new. Read the documentation for help.
