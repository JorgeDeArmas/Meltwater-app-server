import S3 from "aws-sdk/clients/s3";
import config from "config";

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

  upload(bucketName: string, file: Express.Multer.File) {
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

const s3Service = new S3Service();

export default s3Service;
