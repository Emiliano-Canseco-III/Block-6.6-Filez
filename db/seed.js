import db from "#db/client";

import { createFolder } from "#db/queries/files.js";
import { createFile } from "#db/queries/folders.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 3; i++) {
    await createFolder("Folder " + i);
  }

  for (let i = 1; i <= 5; i++) {
    await createFile("Files " + i);
  }
}
