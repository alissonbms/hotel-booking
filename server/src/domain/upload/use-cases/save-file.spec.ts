import { InMemoryUploadRepository } from "../../../../test/repositories/in-memory-upload-repository";
import { SaveFileUseCase } from "./save-file";

let uploadRepository: InMemoryUploadRepository;
let useCase: SaveFileUseCase;

describe("Upload files", () => {
  beforeEach(() => {
    uploadRepository = new InMemoryUploadRepository();
    useCase = new SaveFileUseCase(uploadRepository);
  });
  test("Should upload a file", async () => {
    const response = await useCase.handle({
      name: "imagename.jpeg",
      type: "image/jpeg",
      content: Buffer.from("test content"),
    });

    expect(response.isRight()).toBe(true);
    expect(response.value).toEqual({
      path: expect.stringContaining("upload/imagename.jpeg"),
    });
  });
});
