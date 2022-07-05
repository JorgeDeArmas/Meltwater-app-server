import { v4 as uuidv4 } from "uuid";
import path from "path";
import mongoose, { Schema } from "mongoose";

export interface IDocument {
  id: string;
  name: string;
  extension: string;
  urlOriginal: string;
  urlClassified: string;
}

export abstract class Document implements IDocument {
  id: string;
  name: string;
  extension: string;
  urlOriginal: string;
  urlClassified: string;

  constructor(file: Express.Multer.File) {
    this.id = uuidv4();
    this.name = file.originalname;
    this.extension = path.extname(file.originalname);
    this.urlOriginal = "";
    this.urlClassified = "";
  }

  abstract process(file: Express.Multer.File, keywords: string): Promise<IDocument | null>;
}

const documentSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  extension: { type: String, required: true },
  urlOriginal: { type: String, required: true },
  urlClassified: { type: String, required: true },
});

export default mongoose.model<IDocument>("Document", documentSchema);
