import fs from "fs";
import { matchString } from "./string.utils";
import path from "path";

export function readTxt(filePath: string, keywords: string, fileName: string): void {
    fs.readFile(filePath, "utf-8", (err, text) => {
        if (err) throw err;

        const document = matchString(keywords, text);

        if (document)
            fs.writeFile(path.join("uploads", `${fileName}.txt`), document, (err) => {
                if (err) throw err;
            });
    });
}
process.on("uncaughtException", (err) => {
    throw err;
});
