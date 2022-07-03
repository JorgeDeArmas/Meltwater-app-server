import { IDocument } from "../model/document.model";
import Pdf from "../model/pdf.model";
import Txt from "../model/txt.model";
import Doc from "../model/doc.model";
import path from "path";

class DocumentService {
  async create(file: Express.Multer.File | undefined, keywords: string): Promise<IDocument | null> {
    if (!file) return null;

    const extension = path.extname(file.originalname);

    switch (extension) {
      case ".pdf": {
        const pdf = new Pdf(file);
        return await pdf.process(file, keywords);
      }
      case ".txt": {
        const txt = new Txt(file);
        return await txt.process(file, keywords);
      }
      case ".docx": {
        const doc = new Doc(file);
        return await doc.process(file, keywords);
      }
      default:
        return null;
    }
  }
}

const documentService = new DocumentService();

export default documentService;
