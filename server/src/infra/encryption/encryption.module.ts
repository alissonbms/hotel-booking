import { Module } from "@nestjs/common";
import { HashService } from "./hash.service";
import { HashRepository } from "@/domain/employee/services/hash-repository";

@Module({
  providers: [{ provide: HashRepository, useClass: HashService }],
  exports: [HashRepository],
})
export class EncryptionModule {}
