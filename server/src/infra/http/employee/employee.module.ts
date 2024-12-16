import { Module } from "@nestjs/common";
import { CreateEmployeeController } from "./controllers/create-employee.controller";
import { CreateEmployeeUseCase } from "@/domain/employee/use-cases/create-employee";
import { EmployeeRepository } from "@/domain/employee/repositories/employee-repository";
import { HashRepository } from "@/domain/employee/services/hash-repository";
import { EncryptionModule } from "@/infra/encryption/encryption.module";
import { DatabaseModule } from "@/infra/database/database.module";
import { AuthEmployeeUseCase } from "@/domain/employee/use-cases/auth-employee";
import { TokenRepository } from "@/domain/employee/services/token-repository";
import { LoginEmployeeController } from "./controllers/login-employee.controller";

@Module({
  imports: [EncryptionModule, DatabaseModule],
  providers: [
    {
      provide: CreateEmployeeUseCase,
      useFactory: (
        employeeRepository: EmployeeRepository,
        hashRepository: HashRepository,
      ) => {
        return new CreateEmployeeUseCase(employeeRepository, hashRepository);
      },
      inject: [EmployeeRepository, HashRepository],
    },
    {
      provide: AuthEmployeeUseCase,
      useFactory: (
        employeeRepository: EmployeeRepository,
        hashRepository: HashRepository,
        tokenRepository: TokenRepository,
      ) => {
        return new AuthEmployeeUseCase(
          employeeRepository,
          hashRepository,
          tokenRepository,
        );
      },
      inject: [EmployeeRepository, HashRepository, TokenRepository],
    },
  ],
  controllers: [CreateEmployeeController, LoginEmployeeController],
})
export class EmployeeModule {}
