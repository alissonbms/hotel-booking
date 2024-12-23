import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "@/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { DatabaseModule } from "@/infra/database/database.module";
import { hash } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { randomUUID } from "node:crypto";
import { Employee, Room } from "@prisma/client";

describe("EditRoomController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let employee: Employee;
  let room: Room;

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

    room = {
      id: randomUUID(),
      name: "Amazing room",
      price: 29345,
      image: "room-image.png",
      hasAir: true,
      hasKitchen: true,
      hasWifi: false,
      isPetFriendly: false,
      isAvailable: true,
    };

    await prisma.room.create({
      data: room,
    });
  });

  test("/rooms/:id (PUT)", async () => {
    const token = jwt.sign(employee);

    const response = await request(app.getHttpServer())
      .put(`/rooms/${room.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Edited room",
        image: "edited-image.png",
        hasAir: false,
        hasKitchen: false,
        hasWifi: true,
        isPetFriendly: true,
      });

    expect(response.statusCode).toBe(204);

    const response2 = await request(app.getHttpServer())
      .get(`/rooms/${room.id}`)
      .send();

    expect(response2.statusCode).toBe(200);
    expect(response2.body).toHaveProperty("name", "Edited room");
    expect(response2.body).toHaveProperty("price", 29345);
    expect(response2.body).toHaveProperty("image", "edited-image.png");
    expect(response2.body).toHaveProperty("hasAir", false);
    expect(response2.body).toHaveProperty("hasKitchen", false);
    expect(response2.body).toHaveProperty("hasWifi", true);
    expect(response2.body).toHaveProperty("isPetFriendly", true);
    expect(response2.body).toHaveProperty("isAvailable", true);
  });
});
