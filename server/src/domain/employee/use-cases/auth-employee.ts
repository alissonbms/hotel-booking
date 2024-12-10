import { InvalidCredentialsError } from "../../../core/errors/custom-errors/invalid-credentials-error";
import { Either, left, right } from "../../../core/errors/either/either";
import Employee from "../entities/employee";
import { EmployeeRepository } from "../repositories/employee-repository";
import { HashRepository } from "../services/hash-repository";
import { TokenRepository } from "../services/token-repository";

type Request = {
  email: string;
  password: string;
};

type Response = Either<
  InvalidCredentialsError,
  { employee: Employee; token: string }
>;

export class AuthEmployeeUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private hashRepository: HashRepository,
    private tokenRepository: TokenRepository,
  ) {}

  async handle(data: Request): Promise<Response> {
    const employee = await this.employeeRepository.findByEmail(data.email);

    if (!employee) {
      return left(new InvalidCredentialsError());
    }

    const passwordMatches = await this.hashRepository.compare(
      data.password,
      employee.password,
    );

    if (!passwordMatches) {
      return left(new InvalidCredentialsError());
    }

    const token = await this.tokenRepository.generate({
      id: employee.id.toString(),
      name: employee.name,
      email: employee.email.value,
    });

    return right({ employee, token });
  }
}
