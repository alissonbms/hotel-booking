import { UploadRepository } from "@/domain/upload/repositories/upload-repository";
import { SaveFileUseCase } from "@/domain/upload/use-cases/save-file";
import { Module } from "@nestjs/common";
import { SaveFileController } from "./controllers/save-file.controller";
import AwsSdkModule from "@/infra/upload/aws-sdk.module";

@Module({
  imports: [AwsSdkModule],
  providers: [
    {
      provide: SaveFileUseCase,
      useFactory: (uploadRepository: UploadRepository) => {
        return new SaveFileUseCase(uploadRepository);
      },
      inject: [UploadRepository],
    },
  ],
  controllers: [SaveFileController],
})
export default class UploadModule {}
