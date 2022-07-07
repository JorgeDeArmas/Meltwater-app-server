import { Request, Response, NextFunction } from "express";
import documentService from "../service/document.service";
import path from "path";

class DocumentController {
    static async create(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            if (!req.body?.phrase) return res.status(400).send({ message: "The phrase field is required" });

            const file = await documentService.create(req.file, req.body?.phrase);

            if (!file) return res.send(400).send({ message: "The Document could not be processed" });

            return res.status(201).send(file);
        } catch (err) {
            next(err);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            if (!req.query?.page || !req.query?.limit)
                return res.status(400).send({ message: "The page and limit are required" });

            const page = req.query.page;
            const limit = req.query.limit;

            if (req.query?.criteria !== "") {
                const criteria = req.query.criteria;
                const documents = await documentService.filter(page, limit, criteria);

                return res.status(200).send(documents);
            } else {
                const listDocuments = await documentService.getAll(page, limit);
                return res.status(200).send(listDocuments);
            }
        } catch (err) {
            next(err);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            if (!req.params?.id) return res.status(400).send({ message: "The Id is required" });

            const deletedDocument = await documentService.delete(req.params.id);

            if (!deletedDocument) return res.status(404).send({ message: "Document not found" });

            return res.sendStatus(204);
        } catch (err) {
            next(err);
        }
    }

    static async download(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            if (!req.params?.id) return res.status(400).send({ message: "The Id is required" });
            const id = req.params.id;

            return res.download(path.join("uploads", `${id}`));
        } catch (err) {
            next(err);
        }
    }
}

export default DocumentController;
