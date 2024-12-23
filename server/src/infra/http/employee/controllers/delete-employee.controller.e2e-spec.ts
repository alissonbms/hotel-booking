import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "@/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { DatabaseModule } from "@/infra/database/database.module";
import { hash } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { AuthModule } from "@/infra/auth/auth.module";
import { randomUUID } from "node:crypto";
import { Employee } from "@prisma/client";

describe("DeleteEmployeeController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let employee: Employee;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = moduleFixture.get(PrismaService);
    jwt = moduleFixture.get(JwtService);
    await app.init();

    employee = {
      id: randomUUID(),
      name: "Jess",
      email: "jess@email.com",
      password: await hash("jess156lkj", 10),
    };

    await prisma.employee.create({
      data: employee,
    });
  });

  test("/employees/:id (DELETE)", async () => {
    const token = jwt.sign(employee);

    const employee2 = await prisma.employee.create({
      data: {
        id: randomUUID(),
        name: "John",
        email: "john@email.com",
        password: "1234abc",
      },
    });

    const response = await request(app.getHttpServer())
      .delete(`/employees/${employee2.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(204);

    const employees = await prisma.employee.findMany();

    expect(employees).toHaveLength(1);
  });
});
