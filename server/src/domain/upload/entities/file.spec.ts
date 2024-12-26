import Entity from "@/core/entities/entity";
import { File } from "./file";

describe("File Entity", () => {
  test("Should create a file", () => {
    const file = File.create({
      name: "imagename.jpeg",
      type: "image/jpeg",
      content: Buffer.from("test content"),
    });

    expect(file).toBeInstanceOf(File);
    expect(file).toBeInstanceOf(Entity);
    expect(file.name).toEqual("imagename.jpeg");
    expect(file.type).toEqual("image/jpeg");
    expect(file.content).toBeInstanceOf(Buffer);
  });
});
