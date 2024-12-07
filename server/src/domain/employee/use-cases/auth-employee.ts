import { EmployeeRepository } from "../repositories/employee-repository";
import { HashRepository } from "../services/hash-repository";
import { TokenRepository } from "../services/token-repository";

type Request = {
  email: string;
  password: string;
};

export class AuthEmployeeUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private hashRepository: HashRepository,
    private tokenRepository: TokenRepository,
  ) {}

  async handle(data: Request) {
    const employee = await this.employeeRepository.findByEmail(data.email);

    if (!employee) {
      return null;
    }

    const passwordMatches = await this.hashRepository.compare(
      data.password,
      employee.password,
    );

    if (!passwordMatches) {
      return null;
    }

    const token = await this.tokenRepository.generate({
      id: employee.id.toString(),
      name: employee.name,
      email: employee.email.value,
    });

    return { employee, token };
  }
}
