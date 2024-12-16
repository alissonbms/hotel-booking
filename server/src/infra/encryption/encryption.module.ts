import { Module } from "@nestjs/common";
import { HashService } from "./hash.service";
import { HashRepository } from "@/domain/employee/services/hash-repository";
import { TokenRepository } from "@/domain/employee/services/token-repository";
import { TokenService } from "./token.service";

@Module({
  providers: [
    { provide: HashRepository, useClass: HashService },
    { provide: TokenRepository, useClass: TokenService },
  ],
  exports: [HashRepository, TokenRepository],
})
export class EncryptionModule {}
