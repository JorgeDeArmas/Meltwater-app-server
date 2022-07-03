"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.proccess = void 0;
const pdf_utils_1 = __importDefault(require("../utils/pdf.utils"));
const path_1 = __importDefault(require("path"));
function proccess(file) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(path_1.default.extname((file === null || file === void 0 ? void 0 : file.originalname) || "doc"));
        if (file)
            return yield (0, pdf_utils_1.default)(file.path);
        return null;
    });
}
exports.proccess = proccess;
function remove(file) {
    return true;
}
exports.remove = remove;
//# sourceMappingURL=document.helper.js.map