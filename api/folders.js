import express from "express";
const router = express.Router();

import { getFolders, getFolderById } from "#db/queries/folders";
import { createFile } from "#db/queries/files";

router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

router.param("id", async (req, res, next, id) => {
  if (isNaN(id)) {
    return res.status(400).send("ID must be a number.");
  }

  const folder = await getFolderById(id);
  if (!folder) {
    return res.status(404).send("Folder does not exist.");
  }
  req.folder = folder;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.folder);
});

router.post("/:id/files", async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send("Request body is required.");
    }

    const { name, size } = req.body;
    if (!name || !size) {
      return res.status(400).send("Name and size are required.");
    }

    const result = await createFile(name, size, req.folder.id);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

export default router;
