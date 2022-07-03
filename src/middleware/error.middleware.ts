import { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  res.status(err.statusCode || 500).send(err.message);
};

export default errorHandler;
