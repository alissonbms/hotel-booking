import { TokenRepository } from "../../src/domain/employee/services/token-repository";

export class TokenSimulator implements TokenRepository {
  generate(value: Record<string, unknown>) {
    return JSON.stringify(value);
  }
}
