import Employee from "../entities/employee";

export abstract class EmployeeRepository {
  abstract create(employee: Employee): Promise<Employee>;
  abstract findMany(): Promise<Employee[]>;
  abstract findById(id: string): Promise<Employee | null>;
  abstract findByEmail(email: string): Promise<Employee | null>;
  abstract save(employee: Employee): Promise<void>;
  abstract delete(id: string): Promise<void>;
}