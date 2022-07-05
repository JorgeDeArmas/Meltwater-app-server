import express, { Express, Request, Response } from "express";
import connect from "../service/db.service";
import helmet from "helmet";
import cors from "cors";
import documentRouter from "./document.routes";
import errorHandler from "../middleware/error.middleware";

export default function (app: Express) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(helmet());
  connect();

  app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Meltwater Classified document Api");
  });
  app.use("/documents", documentRouter);
  app.use(errorHandler);
}
