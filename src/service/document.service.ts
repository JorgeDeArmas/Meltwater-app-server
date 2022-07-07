import { IDocument } from "../model/document.model";
import Document from "../model/document.model";
import s3 from "../service/s3.service";
import Pdf from "../model/pdf.model";
import Txt from "../model/txt.model";
import Doc from "../model/doc.model";
import path from "path";
import config from "config";
import { escapeRegExp } from "lodash";

class DocumentService {
    async create(file: Express.Multer.File | undefined, keywords: string): Promise<IDocument | null> {
        if (!file) return null;

        const processedDocument = await this.process(file, keywords);
        const bucketOriginalDocument = await s3.upload(
            config.get("aws.AWS_BUCKET_NAME"),
            file.originalname,
            file.mimetype,
            file.path,
        );

        if (!processedDocument) return null;

        const extension = path.extname(file.originalname);
        const pathFile = path.join("uploads", `${processedDocument.id}${extension}`);

        const bucketClassifiedDocument = await s3.upload(
            config.get("aws.AWS_BUCKET_NAME"),
            `${file.originalname}-${processedDocument.id}`,
            file.mimetype,
            pathFile,
        );

        processedDocument.urlOriginal = bucketOriginalDocument.Location;
        processedDocument.urlClassified = bucketClassifiedDocument.Location;

        const newDocument = new Document(processedDocument);
        await newDocument.save();

        return processedDocument;
    }

    async process(file: Express.Multer.File | undefined, keywords: string): Promise<IDocument | null> {
        if (!file) return null;

        const extension = path.extname(file.originalname);

        switch (extension) {
            case ".pdf": {
                const pdf = new Pdf(file);
                const document = await pdf.process(file, keywords);

                return document;
            }
            case ".txt": {
                const txt = new Txt(file);
                const document = await txt.process(file, keywords);

                return document;
            }
            case ".docx": {
                const doc = new Doc(file);
                const document = await doc.process(file, keywords);

                return document;
            }
            default:
                return null;
        }
    }

    async filter(page: any, limit: any, criteria: any): Promise<any[]> {
        const escapeCriteria = escapeRegExp(criteria);
        const expression = new RegExp(`.*${escapeCriteria}.*`, "i");

        const listDocuments = await Document.find({ name: { $regex: expression } })
            .skip((parseInt(page) - 1) * parseInt(limit))
            .limit(limit)
            .sort("name");
        return listDocuments;
    }

    async getAll(page: any, limit: any): Promise<any[]> {
        const listDocuments = await Document.find()
            .skip((parseInt(page) - 1) * parseInt(limit))
            .limit(limit)
            .sort("name");

        return listDocuments;
    }

    async delete(id: string): Promise<number | null> {
        const document = await Document.findOne({ id: id });

        if (!document) return null;

        const s3Instance = s3.getInstance();

        await s3Instance
            .deleteObject({ Bucket: config.get("aws.AWS_BUCKET_NAME"), Key: `uploads/${document.name}` })
            .promise();

        return await document.delete();
    }
}

const documentService = new DocumentService();

export default documentService;
