import express from "express";
import uploadFile from "../middleware/uploadFile.middleware";
import { fileExtensions } from "../middleware/file.middleware";
import DocumentController from "../controller/document.controller";

const router = express.Router();

router.post(
  "/",
  uploadFile.single("file"),
  fileExtensions([".pdf", ".docx", ".txt"]),
  DocumentController.create
);
router.get("/", DocumentController.getAll);
router.get("/:id/downloads", DocumentController.download);

export default router;
