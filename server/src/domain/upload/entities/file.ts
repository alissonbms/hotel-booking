import Entity from "@/core/entities/entity";
import Identity from "@/core/entities/identity";

type FileType = {
  name: string;
  type: string;
  content: Buffer;
};

export class File extends Entity<FileType> {
  static create(data: FileType, id?: Identity) {
    return new File(data, id);
  }

  get name() {
    return this.attributes.name;
  }

  get type() {
    return this.attributes.type;
  }

  get content() {
    return this.attributes.content;
  }
}
