import { InMemoryEmployeeRepository } from "../../../../tests/repositories/in-memory-employee-repository";
import { HashSimulator } from "../../../../tests/services/hash-simulator";
import Email from "../../shared/value-objects/email";
import Employee from "../entities/employee";
import { TokenSimulator } from "../../../../tests/services/token-simulator";
import { AuthEmployeeUseCase } from "./auth-employee";

let employeeRepository: InMemoryEmployeeRepository;
let hashRepository: HashSimulator;
let tokenRepository: TokenSimulator;
let useCase: AuthEmployeeUseCase;

describe("Authenticate employee", () => {
  beforeEach(() => {
    employeeRepository = new InMemoryEmployeeRepository();
    hashRepository = new HashSimulator();
    tokenRepository = new TokenSimulator();
    useCase = new AuthEmployeeUseCase(
      employeeRepository,
      hashRepository,
      tokenRepository,
    );
  });
  test("Should authenticate the employee correctly and return the access token and employee data", async () => {
    const hashedPassword = await hashRepository.hash("nn123");

    const employee = Employee.create({
      name: "Nichols",
      email: Email.create("nichols@email.com"),
      password: hashedPassword,
    });

    employeeRepository.employees.push(employee);

    const response = await useCase.handle({
      email: "nichols@email.com",
      password: "nn123",
    });

    expect(response).toEqual({
      token: expect.any(String),
      employee: expect.any(Employee),
    });
  });
  test("Should not find any employees and return null", async () => {
    const response = await useCase.handle({
      email: "nichols@email.com",
      password: "nn123",
    });

    expect(response).toBeNull();
  });
  test("Should NOT authenticate the employee with wrong credentials", async () => {
    const hashedPassword = await hashRepository.hash("nn123");

    const employee = Employee.create({
      name: "Nichols",
      email: Email.create("nichols@email.com"),
      password: hashedPassword,
    });

    employeeRepository.employees.push(employee);

    const response = await useCase.handle({
      email: "nichols@email.com",
      password: "nn1234",
    });

    expect(response).toBeNull();
  });
});
