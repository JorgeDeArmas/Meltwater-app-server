import { Document, IDocument } from "./document.model";
import { readDoc } from "../utils/doc.utils";

export default class Doc extends Document {
    constructor(file: Express.Multer.File) {
        super(file);
    }

    async process(file: Express.Multer.File, keywords: string): Promise<IDocument | null> {
        await readDoc(file.path, keywords, this.id);

        const docDocument: IDocument = {
            id: this.id,
            name: this.name,
            extension: this.extension,
            urlOriginal: this.urlOriginal,
            urlClassified: this.urlClassified,
        };

        return docDocument;
    }
}
