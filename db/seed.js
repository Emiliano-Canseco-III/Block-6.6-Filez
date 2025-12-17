import db from "#db/client";

import { createFolder } from "#db/queries/folders";
import { createFile } from "#db/queries/files";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // This will loop through each folder ID (1, 2, and 3)
  for (let f = 1; f <= 3; f++) {
    const folder = await createFolder("Folder " + f);

    // Creates exactly 5 files for the current folder
    for (let i = 1; i <= 5; i++) {
      const size = 1 + Math.floor(Math.random() * 51) + 50;

      try {
        await createFile(`File_${f}_${i}`, size, folder.id);
      } catch (err) {
        console.error(
          `Failed to seed File: ${i} (Folder ID: ${folder.name})`,
          err.message
        );
      }
    }
  }
}
