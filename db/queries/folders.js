import db from "#db/client";

export async function createFolder(name) {
  const sql = `
    INSERT INTO folders
        (name)
    VALUES
        ($1)
    RETURNING *
    `;
  const {
    rows: [folder],
  } = await db.query(sql, [name]);
  return folder;
}

export async function getFolders() {
  const sql = `
    SELECT *
    FROM folders
    `;
  const { rows: folders } = await db.query(sql);
  return folders;
}

export async function getFolderById(id) {
  const sql = `
    SELECT folders.*, json_agg(files.*) AS files
    FROM folders
    LEFT JOIN files ON folders.id = files.folder_id
    WHERE folders.id = $1
    GROUP BY folders.id
    `;
  const {
    rows: [folder],
  } = await db.query(sql, [id]);
  return folder;
}
