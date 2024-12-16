import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "@/app.module";

describe("CreateEmployeeController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  test("/employees (POST)", async () => {
    const response = await request(app.getHttpServer())
      .post("/employees")
      .send({
        name: "John",
        email: "john@email.com",
        password: "1234abc",
      });

    expect(response.statusCode).toBe(201);
  });
});
