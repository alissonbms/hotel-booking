import { TokenRepository } from "@/domain/employee/services/token-repository";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService implements TokenRepository {
  constructor(private readonly jwtService: JwtService) {}
  generate(value: Record<string, unknown>): string {
    return this.jwtService.sign(value);
  }
}
