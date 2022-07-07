import express from "express";
import start from "./routes/server.routes";
const PORT = process.env.PORT || 5000;
const app = express();

start(app);

app.listen(PORT, () => console.log(`App listen on port ${PORT}`));
