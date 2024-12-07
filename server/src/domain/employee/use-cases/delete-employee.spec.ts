import { InMemoryEmployeeRepository } from "../../../../tests/repositories/in-memory-employee-repository";
import Email from "../../shared/value-objects/email";
import Employee from "../entities/employee";
import { DeleteEmployeeUseCase } from "./delete-employee";

let employeeRepository: InMemoryEmployeeRepository;
let useCase: DeleteEmployeeUseCase;

describe("Delete a employee", () => {
  beforeEach(() => {
    employeeRepository = new InMemoryEmployeeRepository();
    useCase = new DeleteEmployeeUseCase(employeeRepository);
  });
  test("Should delete a employee", async () => {
    const employee = Employee.create({
      name: "Nichols",
      email: Email.create("nichols@email.com"),
      password: "nn123",
    });

    employeeRepository.employees.push(employee);
    expect(employeeRepository.employees[0]).toBeDefined();
    expect(employeeRepository.employees).toHaveLength(1);

    await useCase.handle({ id: employee.id.toString() });
    expect(employeeRepository.employees[0]).toBeUndefined();
    expect(employeeRepository.employees).toHaveLength(0);
  });
  test("Should not find any employees and return null", async () => {
    const response = await useCase.handle({ id: "123" });

    expect(response).toBeNull();
  });
});
