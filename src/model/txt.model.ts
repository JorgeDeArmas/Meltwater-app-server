import { Document, IDocument } from "./document.model";
import { matchString } from "../utils/string.utils";
import fs from "fs";
import path from "path";

export default class Txt extends Document {
    constructor(file: Express.Multer.File) {
        super(file);
    }

    async process(file: Express.Multer.File, keywords: string): Promise<IDocument | null> {
        fs.readFile(file.path, "utf-8", (err, text) => {
            if (err) throw err;

            if (!text) throw new Error("Empty text");

            const document = matchString(keywords, text);

            if (!document) throw new Error("Empty text");

            fs.writeFile(path.join("uploads", `${this.id}.txt`), document, (err) => {
                if (err) throw err;
            });
        });

        const txtDocument: IDocument = {
            id: this.id,
            name: this.name,
            extension: this.extension,
            urlOriginal: this.urlOriginal,
            urlClassified: this.urlClassified,
        };

        return txtDocument;
    }
}
