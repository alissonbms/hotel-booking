import Email from "../../shared/value-objects/email";
import Employee from "../entities/employee";
import { EmployeeRepository } from "../repositories/employee-repository";
import { HashRepository } from "../services/hash-repository";

type Request = {
  name: string;
  email: string;
  password: string;
};

export class CreateEmployeeUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private hashRepository: HashRepository,
  ) {}

  async handle(data: Request) {
    const emailInUse = await this.employeeRepository.findByEmail(data.email);

    if (emailInUse) {
      return null;
    }

    const employeeEmail = Email.create(data.email);

    if (!employeeEmail.validate()) {
      return null;
    }

    const hashedPassword = await this.hashRepository.hash(data.password);

    const employee = Employee.create({
      name: data.name,
      email: employeeEmail,
      password: hashedPassword,
    });
    await this.employeeRepository.create(employee);
    return employee;
  }
}
