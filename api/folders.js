import express from "express";
const router = express.Router();

import { getFolders, getFoldersById } from "#db/queries/folders";

router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(tracks);
});

router.param("id", async (req, res, next, id) => {
  if (isNaN(id)) {
    return res.status(400).send("ID must be a number.");
  }

  const folder = await getFoldersById(id);
  if (!folder) {
    return res.status(404).send("Folder does not exist.");
  }
  req.folder = folder;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.folder);
});

export default router;
