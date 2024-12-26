import { Either, right } from "@/core/errors/either/either";
import { UploadRepository } from "../repositories/upload-repository";
import { File } from "../entities/file";

type Request = {
  name: string;
  type: string;
  content: Buffer;
};

type Response = Either<null, Record<"path", string>>;

export class SaveFileUseCase {
  constructor(private uploadRepository: UploadRepository) {}

  async handle(data: Request): Promise<Response> {
    const file = File.create({
      name: data.name,
      type: data.type,
      content: data.content,
    });

    const uploadedFile = await this.uploadRepository.upload(file);

    return right(uploadedFile);
  }
}
