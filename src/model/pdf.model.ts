import { Document, IDocument } from "./document.model";
import { readPdf, createPdf } from "../utils/pdf.utils";
import { matchString } from "../utils/string.utils";

export default class Pdf extends Document {
  constructor(file: Express.Multer.File) {
    super(file);
  }

  async process(file: Express.Multer.File, keywords: string): Promise<IDocument | null> {
    if (!file) return null;

    const doc = await readPdf(file.path);
    if (!doc?.text) return null;

    const document = matchString(keywords, doc.text);

    if (!document) return null;

    createPdf(document, this.id);

    const pdfDocument: IDocument = {
      id: this.id,
      originalName: this.originalName,
      extension: this.extension,
    };

    return pdfDocument;
  }
}
