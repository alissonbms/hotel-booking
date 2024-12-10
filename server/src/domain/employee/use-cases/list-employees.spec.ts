import { InMemoryEmployeeRepository } from "../../../../test/repositories/in-memory-employee-repository";
import Email from "../../shared/value-objects/email";
import Employee from "../entities/employee";
import { ListEmployeesUseCase } from "./list-employees";

let employeeRepository: InMemoryEmployeeRepository;
let useCase: ListEmployeesUseCase;

describe("List employees", () => {
  beforeEach(() => {
    employeeRepository = new InMemoryEmployeeRepository();
    useCase = new ListEmployeesUseCase(employeeRepository);
  });
  test("Should return a employees array with one employee", async () => {
    const employee = Employee.create({
      name: "Nichols",
      email: Email.create("nichols@email.com"),
      password: "nn123",
    });

    employeeRepository.employees.push(employee);

    const response = await useCase.handle();

    expect(response.isRight()).toBe(true);
    expect(response.value).toHaveLength(1);
    expect(employeeRepository.employees).toHaveLength(1);
  });
  test("Should return an empty employees array", async () => {
    const response = await useCase.handle();

    expect(response.isRight()).toBe(true);
    expect(response.value).toHaveLength(0);
    expect(employeeRepository.employees).toHaveLength(0);
  });
});
