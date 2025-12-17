import db from "#db/client";

import { createFolder } from "#db/queries/files";
import { createFile } from "#db/queries/folders";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 3; i++) {
    await createFolder("Folder " + i);
  }

  for (let i = 1; i <= 5; i++) {
    const folderId = 1 + Math.floor(Math.random() * 3);
    const size = 1 + Math.floor(Math.random() * (100 - 50 + 1)) + 50;

    try {
      await createFile("File " + i, size, folderId);
    } catch (err) {
      console.error(
        `Failed to seed Files ${i} (Folder ID: ${folderId}):
        `,
        err.message
      );
    }
  }
}
