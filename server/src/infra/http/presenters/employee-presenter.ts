import Employee from "@/domain/employee/entities/employee";

export class EmployeePresenter {
  static toHTTP(entity: Employee) {
    return {
      id: entity.id.toString(),
      name: entity.name,
      email: entity.email.value,
    };
  }
}
