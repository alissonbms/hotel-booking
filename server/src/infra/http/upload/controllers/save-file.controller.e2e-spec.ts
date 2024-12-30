import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "@/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { DatabaseModule } from "@/infra/database/database.module";
import { hash } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { randomUUID } from "node:crypto";
import { Employee } from "@prisma/client";

describe("SaveFileController(e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let employee: Employee;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
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

  test("/upload (POST)", async () => {
    const token = jwt.sign(employee);
    const filename = "person.png";

    const response = await request(app.getHttpServer())
      .post("/upload")
      .set("Authorization", `Bearer ${token}`)
      .attach("file", __dirname + "/" + filename);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("path");
    expect(response.body).toEqual({
      path: expect.stringContaining(filename),
    });
  });
});
