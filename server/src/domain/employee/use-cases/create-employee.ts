import { InvalidFormatError } from "../../../errors/custom-errors/invalid-format-error";
import { NotAllowedError } from "../../../errors/custom-errors/not-allowed-error";
import { Either, left, right } from "../../../errors/either/either";
import Email from "../../shared/value-objects/email";
import Employee from "../entities/employee";
import { EmployeeRepository } from "../repositories/employee-repository";
import { HashRepository } from "../services/hash-repository";

type Request = {
  name: string;
  email: string;
  password: string;
};

type Response = Either<NotAllowedError | InvalidFormatError, Employee>;

export class CreateEmployeeUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private hashRepository: HashRepository,
  ) {}

  async handle(data: Request): Promise<Response> {
    const emailInUse = await this.employeeRepository.findByEmail(data.email);

    if (emailInUse) {
      return left(new NotAllowedError("because email is already in use"));
    }

    const employeeEmail = Email.create(data.email);

    if (!employeeEmail.validate()) {
      return left(new InvalidFormatError("email"));
    }

    const hashedPassword = await this.hashRepository.hash(data.password);

    const employee = Employee.create({
      name: data.name,
      email: employeeEmail,
      password: hashedPassword,
    });

    await this.employeeRepository.create(employee);
    return right(employee);
  }
}
