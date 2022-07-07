import S3 from "aws-sdk/clients/s3";
import config from "config";
import fs from "fs";
import { unlinkDocument } from "../utils/string.utils";

export class S3Service {
    region: string = config.get("aws.AWS_BUCKET_REGION");
    accessKeyId: string = config.get("aws.AWS_ACCESS_KEY_ID");
    secretAccessKey: string = config.get("aws.AWS_SECRET_ACCESS_KEY");
    s3: S3;

    constructor() {
        this.s3 = new S3({
            region: this.region,
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
        });
    }

    getInstance(): S3 {
        return this.s3;
    }

    upload(bucketName: string, name: string, mimetype: string, path: string): Promise<any> {
        const buffer = fs.readFileSync(path);
        unlinkDocument(path);

        const params = {
            Bucket: bucketName,
            Body: buffer,
            Key: `uploads/${name}`,
            ContentType: mimetype,
        };

        return this.s3.upload(params).promise();
    }
}

const s3Service = new S3Service();

export default s3Service;
