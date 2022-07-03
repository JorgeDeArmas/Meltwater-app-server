"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
let fileString = fs_1.default.readFileSync(path_1.default.join("/Users/admin/Desktop/Proyectos/Meltwater/document", "files", "Resume.pdf"));
(0, pdf_parse_1.default)(fileString)
    .then((data) => {
    console.log("Content: ", data.text);
    console.log("Total pages: ", data.numpages);
    console.log("Info: ", data.info);
})
    .catch((err) => console.log(err));
//# sourceMappingURL=fs.utils.js.map