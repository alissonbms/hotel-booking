import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "@/app.module";
import { hash } from "bcrypt";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { DatabaseModule } from "@/infra/database/database.module";

describe("LoginEmployeeController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = moduleFixture.get(PrismaService);
    await app.init();

    await prisma.employee.create({
      data: {
        name: "John",
        email: "john@email.com",
        password: await hash("1234abc", 10),
      },
    });
  });

  test("/login (POST)", async () => {
    const response = await request(app.getHttpServer()).post("/login").send({
      email: "john@email.com",
      password: "1234abc",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("employee");
    expect(response.body).toHaveProperty("token");
  });
});
