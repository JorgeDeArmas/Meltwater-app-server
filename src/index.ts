import express from "express";
import config from "config";
import start from "./routes/server.routes";
const app = express();

start(app);

app.listen(config.get("port"), () => console.log(`App listen on port ${config.get("port")}`));
