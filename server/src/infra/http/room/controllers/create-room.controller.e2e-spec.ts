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

describe("CreateRoomController (e2e)", () => {
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

  test("/rooms (POST)", async () => {
    const token = jwt.sign(employee);

    const response = await request(app.getHttpServer())
      .post("/rooms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: randomUUID(),
        name: "Amazing room",
        price: 29345,
        image: "room-image.png",
        hasAir: true,
        hasKitchen: true,
        hasWifi: false,
        isPetFriendly: false,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("name", "Amazing room");
    expect(response.body).toHaveProperty("price", 29345);
    expect(response.body).toHaveProperty("image", "room-image.png");
    expect(response.body).toHaveProperty("hasAir", true);
    expect(response.body).toHaveProperty("hasKitchen", true);
    expect(response.body).toHaveProperty("hasWifi", false);
    expect(response.body).toHaveProperty("isPetFriendly", false);
    expect(response.body).toHaveProperty("isAvailable", true);

    const rooms = await prisma.room.findMany();
    expect(rooms).toHaveLength(1);
  });
});
