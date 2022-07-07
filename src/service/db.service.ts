import mongoose from "mongoose";
import config from "config";

export default function () {
    mongoose
        .connect(
            `mongodb+srv://${config.get("db.USER")}:${config.get(
                "db.PASSWORD",
            )}@cluster0.x936k.mongodb.net/${config.get("db.NAME")}?retryWrites=true&w=majority`,
        )
        .then(() => console.log(`Connected to ${config.get("db.NAME")}`));
}
