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

describe("EditEmployeeController (e2e)", () => {
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

  test("/employees/:id (PUT)", async () => {
    const token = jwt.sign(employee);

    const response = await request(app.getHttpServer())
      .put(`/employees/${employee.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "John",
        email: "john@email.com",
        password: "1234abc",
      });

    expect(response.statusCode).toBe(204);

    const response2 = await request(app.getHttpServer())
      .get(`/employees/${employee.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response2.statusCode).toBe(200);
    expect(response2.body).toHaveProperty("name", "John");
    expect(response2.body).toHaveProperty("email", "john@email.com");
  });
});
