import multer from "multer";

const fileSize = 5 * 1024 * 1024; //5 Mega Bytes Max
const uploadFile = multer({ dest: "./uploads", limits: { fileSize } });

export default uploadFile;
