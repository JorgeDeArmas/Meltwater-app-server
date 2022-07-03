import fs from "fs";
import pdfParse, { Result } from "pdf-parse";
import PDFDocument from "pdfkit";
import path from "path";

//Read pdf file and return the text
export async function readPdf(filePath: string | undefined): Promise<Result | null> {
  if (!filePath) return null;

  const file = fs.readFileSync(filePath);

  if (!file) return null;

  const data = await pdfParse(file);

  if (!data) return null;

  return data;
}

//Create a PDF file from a given text
export function createPdf(document: string, fileName: string): void {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(path.join("uploads", `${fileName}.pdf`)));
  doc.text(document);
  doc.end();
}
