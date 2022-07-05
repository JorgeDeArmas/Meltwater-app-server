import { IDocument } from "../model/document.model";
import Document from "../model/document.model";
import s3 from "../service/s3.service";
import Pdf from "../model/pdf.model";
import Txt from "../model/txt.model";
import Doc from "../model/doc.model";
import path from "path";
import config from "config";

class DocumentService {
  async create(file: Express.Multer.File | undefined, keywords: string): Promise<IDocument | null> {
    if (!file) return null;

    const extension = path.extname(file.originalname);

    switch (extension) {
      case ".pdf": {
        const pdf = new Pdf(file);
        const pdfDocument = await pdf.process(file, keywords);

        const bucketOriginalDocument = await s3.upload(
          config.get("aws.AWS_BUCKET_NAME"),
          file,
          file.path
        );

        if (!pdfDocument) return null;

        const pathFile = path.join("uploads", `${pdfDocument.id}${extension}`);

        const bucketClassifiedDocument = await s3.upload(
          config.get("aws.AWS_BUCKET_NAME"),
          file,
          pathFile
        );

        pdfDocument.urlOriginal = bucketOriginalDocument.Location;
        pdfDocument.urlClassified = bucketClassifiedDocument.Location;

        const newDocument = new Document(pdfDocument);
        await newDocument.save();

        return pdfDocument;
      }
      case ".txt": {
        const txt = new Txt(file);
        const txtDocument = await txt.process(file, keywords);

        const bucketOriginalDocument = await s3.upload(
          config.get("aws.AWS_BUCKET_NAME"),
          file,
          file.path
        );

        if (!txtDocument) return null;

        const pathFile = path.join("uploads", `${txtDocument.id}${extension}`);

        const bucketClassifiedDocument = await s3.upload(
          config.get("aws.AWS_BUCKET_NAME"),
          file,
          pathFile
        );

        txtDocument.urlOriginal = bucketOriginalDocument.Location;
        txtDocument.urlClassified = bucketClassifiedDocument.Location;

        const newDocument = new Document(txtDocument);
        await newDocument.save();

        return txtDocument;
      }
      case ".docx": {
        const doc = new Doc(file);
        const docDocument = await doc.process(file, keywords);

        const bucketOriginalDocument = await s3.upload(
          config.get("aws.AWS_BUCKET_NAME"),
          file,
          file.path
        );

        if (!docDocument) return null;

        const pathFile = path.join("uploads", `${docDocument.id}${extension}`);

        const bucketClassifiedDocument = await s3.upload(
          config.get("aws.AWS_BUCKET_NAME"),
          file,
          pathFile
        );

        docDocument.urlOriginal = bucketOriginalDocument.Location;
        docDocument.urlClassified = bucketClassifiedDocument.Location;

        const newDocument = new Document(docDocument);
        await newDocument.save();

        return docDocument;
      }
      default:
        return null;
    }
  }

  async getAll(): Promise<any[]> {
    const listDocuments = await Document.find();
    return listDocuments;
  }
}

const documentService = new DocumentService();

export default documentService;
