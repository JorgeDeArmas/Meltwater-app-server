import WordExtractor from "word-extractor";
import fs from "fs";
import { matchString } from "./string.utils";
import path from "path";

export async function readDoc(filePath: string, keywords: string, fileName: string): Promise<void> {
  const extractor = new WordExtractor();
  const extracted = await extractor.extract(filePath);
  const text = extracted.getBody();

  const document = matchString(keywords, text);

  if (document)
    fs.writeFile(path.join("uploads", `${fileName}.docx`), document, (err) => {
      if (err) throw err;
    });
}
process.on("uncaughtException", (err) => {
  throw err;
});
