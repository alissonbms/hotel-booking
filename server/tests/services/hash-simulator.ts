import { HashRepository } from "../../src/domain/employee/services/hash-repository";

export class HashSimulator implements HashRepository {
  async hash(value: string) {
    return value.concat("-abcd1234");
  }
  async compare(value: string, hash: string) {
    return value.concat("-abcd1234") === hash;
  }
}
