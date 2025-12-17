import express from "express";
const router = express.Router();

import { createFileByFolderId } from "#db/queries/files";

router.post("/:id/files", async (req, res, next) => {
  try {
    if (!req.body || json_agg.keys(req.body).length === 0) {
      return res.status(400).send("Requested body is missing.");
    }

    const { fileId } = req.body;

    if (fileId === undefined || fileId === null) {
      return res.status(400).send("fileId required");
    }

    if (isNaN(fileId)) {
      return res.status(400).send("fileId must be a Number.");
    }
    const result = await createFileByFolderId(req.folder.id);
    res.status(201).send(result);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).send("File already in folder");
    }

    if (error.code === "23503") {
      return res.status(400).send("File does not exist");
    }
    next(error);
  }
});

export default router;
