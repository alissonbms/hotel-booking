import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "@/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { DatabaseModule } from "@/infra/database/database.module";
import { randomUUID } from "node:crypto";
import { Room } from "@prisma/client";

describe("GetRoomController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let room: Room;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = moduleFixture.get(PrismaService);
    await app.init();

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

  test("/rooms/:id (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get(`/rooms/${room.id}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", room.id);
    expect(response.body).toHaveProperty("name", "Amazing room");
    expect(response.body).toHaveProperty("price", 29345);
    expect(response.body).toHaveProperty("image", "room-image.png");
    expect(response.body).toHaveProperty("hasAir", true);
    expect(response.body).toHaveProperty("hasKitchen", true);
    expect(response.body).toHaveProperty("hasWifi", false);
    expect(response.body).toHaveProperty("isPetFriendly", false);
    expect(response.body).toHaveProperty("isAvailable", true);
  });
});
