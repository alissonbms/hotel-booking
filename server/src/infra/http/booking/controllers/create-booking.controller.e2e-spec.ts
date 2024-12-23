import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "@/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { DatabaseModule } from "@/infra/database/database.module";
import { randomUUID } from "node:crypto";
import { Room } from "@prisma/client";

describe("CreateBookingController (e2e)", () => {
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

  test("/bookings (POST)", async () => {
    expect(room).toHaveProperty("isAvailable", true);

    const response = await request(app.getHttpServer()).post("/bookings").send({
      roomId: room.id,
      days: 5,
      customer: "Alex",
      email: "alex@email.com",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("room", {
      ...room,
      isAvailable: false,
    });
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("days", 5);
    expect(response.body).toHaveProperty("customer", "Alex");
    expect(response.body).toHaveProperty("email", "alex@email.com");
    expect(response.body).toHaveProperty("isActive", true);

    const bookings = await prisma.booking.findMany();
    expect(bookings).toHaveLength(1);

    const roomNotAvailable = await prisma.room.findFirst({
      where: {
        id: room.id,
      },
    });

    expect(roomNotAvailable).toHaveProperty("isAvailable", false);
  });
});
