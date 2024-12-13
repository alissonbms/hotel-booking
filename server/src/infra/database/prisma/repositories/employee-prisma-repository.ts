import Employee from "@/domain/employee/entities/employee";
import { EmployeeRepository } from "@/domain/employee/repositories/employee-repository";
import { PrismaService } from "../prisma.service";
import { EmployeePrismaMapper } from "../mappers/employee-prisma-mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmployeePrismaRepository implements EmployeeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(employee: Employee): Promise<Employee> {
    const data = EmployeePrismaMapper.toDatabase(employee);

    const newEmployee = await this.prismaService.employee.create({ data });

    return EmployeePrismaMapper.toDomain(newEmployee);
  }

  async findMany(): Promise<Employee[]> {
    const employees = await this.prismaService.employee.findMany();

    return employees.map(EmployeePrismaMapper.toDomain);
  }

  async findById(id: string): Promise<Employee | null> {
    const employee = await this.prismaService.employee.findFirst({
      where: {
        id,
      },
    });

    if (!employee) {
      return null;
    }

    return EmployeePrismaMapper.toDomain(employee);
  }

  async findByEmail(email: string): Promise<Employee | null> {
    const employee = await this.prismaService.employee.findFirst({
      where: {
        email,
      },
    });

    if (!employee) {
      return null;
    }

    return EmployeePrismaMapper.toDomain(employee);
  }

  async save(employee: Employee): Promise<void> {
    const data = EmployeePrismaMapper.toDatabase(employee);

    await this.prismaService.employee.update({
      where: { id: data.id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.employee.delete({
      where: { id },
    });
  }
}
