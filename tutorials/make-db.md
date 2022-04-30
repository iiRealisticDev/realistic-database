## Getting Started

A brief example of this is included on the homepage; however a more in-depth example can be found here. This database is zero-dependency and should work with _most_ versions of Node.

## Installation

```shell
npm i realistic-database
```

## Creating a Database

```typescript
import { RealisticDB, DBFile } from "realistic-database";

/*
Create a database in `./database` with the name `database.json` and content `{}`
of course, DBFile isn't necessary and can just be a simple object
with the properties of {name: "abc.json", content: "{}"}.
Content should generally be an empty object,
or incorporating other data easily
*/
const db = new RealisticDB("./database", new DBFile("database.json", "{}"));

/*
A database has the ability to get & put entries, as well as our exposed methods
that are more internal and may be privatised in the future depending on usage.
*/
```
