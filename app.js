import express from "express";
import folderRouter from "./api/folders.js";
import fileRouter from "./api/files.js";

const app = express();

app.use(express.json());

app.use("/files", fileRouter);
app.use("/folders", folderRouter);

export default app;
