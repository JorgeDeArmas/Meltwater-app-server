import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import documentRouter from "./document.routes";
import errorHandler from "../middleware/error.middleware";

export default function (app: Express) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(helmet());

  app.use("/documents", documentRouter);
  app.use(errorHandler);
}
