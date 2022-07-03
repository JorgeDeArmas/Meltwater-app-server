import { Request, Response, NextFunction } from "express";
import documentService from "../service/document.service";
import path from "path";

class DocumentController {
  static async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const file = await documentService.create(req.file, req.body?.keywords);

      if (!file) return res.send(400).send({ message: "Phrases not found in the document" });

      return res.status(201).send(file);
    } catch (err) {
      next(err);
    }
  }

  static async download(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      if (!req.params) return res.status(400).send({ message: "The Id is required" });
      const id = req.params.id;

      return res.download(path.join("uploads", `${id}`));
    } catch (err) {
      next(err);
    }
  }
}

export default DocumentController;
