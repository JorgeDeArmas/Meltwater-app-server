"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadFile_middleware_1 = __importDefault(require("../middleware/uploadFile.middleware"));
const document_controller_1 = __importDefault(require("../controller/document.controller"));
const router = express_1.default.Router();
router.post("/", uploadFile_middleware_1.default.single("doc"), document_controller_1.default.create);
exports.default = router;
//# sourceMappingURL=document.routes.js.map