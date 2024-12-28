import { UploadRepository } from "@/domain/upload/repositories/upload-repository";
import { AwsSdkService } from "../../aws-sdk.service";
import { File } from "@/domain/upload/entities/file";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UploadAwsSdkRepository implements UploadRepository {
  constructor(private readonly awsSdkService: AwsSdkService) {}
  async upload(file: File): Promise<Record<"path", string>> {
    const uploadedFile = await this.awsSdkService.uploadFile(
      file.name,
      file.type,
      file.content,
    );

    return {
      path: uploadedFile,
    };
  }
}
