import express from "express";
const router = express.Router();

import { getFiles } from "#db/queries/files";

router.get("/", async (req, res, next) => {
  try {
    const files = await getFiles();
    res.send(files);
  } catch (err) {
    next(err);
  }
});

export default router;
