import Employee from "../../src/domain/employee/entities/employee";
import { EmployeeRepository } from "../../src/domain/employee/repositories/employee-repository";

export class InMemoryEmployeeRepository implements EmployeeRepository {
  employees: Employee[] = [];

  async create(employee: Employee) {
    this.employees.push(employee);
    return employee;
  }

  async findMany() {
    return this.employees;
  }

  async findById(id: string) {
    const employee = this.employees.find((item) => item.id.toString() === id);

    if (!employee) {
      return null;
    }

    return employee;
  }

  async findByEmail(email: string) {
    const employee = this.employees.find((item) => item.email.value === email);

    if (!employee) {
      return null;
    }

    return employee;
  }

  async save(employee: Employee) {
    const itemIndex = this.employees.findIndex(
      (item) => item.id.toString() === employee.id.toString(),
    );
    this.employees[itemIndex] = employee;
  }

  async delete(id: string) {
    const itemIndex = this.employees.findIndex(
      (item) => item.id.toString() === id,
    );
    this.employees.splice(itemIndex, 1);
  }
}
