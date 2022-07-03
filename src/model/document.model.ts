import { v4 as uuidv4 } from "uuid";
import path from "path";

export interface IDocument {
  id: string;
  originalName: string;
  extension: string;
}

export abstract class Document implements IDocument {
  id: string;
  originalName: string;
  extension: string;

  constructor(file: Express.Multer.File) {
    this.id = uuidv4();
    this.originalName = file.originalname;
    this.extension = path.extname(file.originalname);
  }

  abstract process(file: Express.Multer.File, keywords: string): Promise<IDocument | null>;
}
