import { UploadRepository } from "@/domain/upload/repositories/upload-repository";
import { Module } from "@nestjs/common";
import { UploadAwsSdkRepository } from "./aws-sdk/repositories/upload-aws-sdk.repository";
import { AwsSdkService } from "./aws-sdk.service";

@Module({
  providers: [
    AwsSdkService,
    { provide: UploadRepository, useClass: UploadAwsSdkRepository },
  ],
  exports: [AwsSdkService, UploadRepository],
})
export default class AwsSdkModule {}
