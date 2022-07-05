import { Request, Response, NextFunction } from "express";
import path from "path";

export const fileExtensions = (allowedExtensions: Array<string>): any => {
  return (req: Request, res: Response, next: NextFunction): any => {
    if (!req.file) return res.status(400).send({ status: "error", message: "Missing files" });

    const extension = path.extname(req.file.originalname);

    if (allowedExtensions.includes(extension)) return next();

    return res.status(400).send({ status: "error", message: "Not allowed file extension" });
  };
};
