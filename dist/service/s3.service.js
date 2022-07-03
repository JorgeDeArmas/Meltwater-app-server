"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const config_1 = __importDefault(require("config"));
class S3Service {
    constructor() {
        this.region = config_1.default.get("aws.AWS_BUCKET_REGION");
        this.accessKeyId = config_1.default.get("aws.AWS_ACCESS_KEY_ID");
        this.secretAccessKey = config_1.default.get("aws.AWS_SECRET_ACCESS_KEY");
        this.s3 = new s3_1.default({
            region: this.region,
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
        });
    }
    upload(bucketName, file) {
        console.log(file);
        const params = {
            Bucket: bucketName,
            Body: file.buffer,
            Key: `uploads/${file.filename}`,
            ContentType: file.mimetype,
        };
        return this.s3.upload(params).promise();
    }
}
exports.S3Service = S3Service;
const s3Service = new S3Service();
exports.default = s3Service;
//# sourceMappingURL=s3.service.js.map