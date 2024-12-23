import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "@/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { DatabaseModule } from "@/infra/database/database.module";
import { randomUUID } from "node:crypto";
import { Booking, Room } from "@prisma/client";

describe("GetBookingController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let room: Room;
  let booking: Booking;

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
      isAvailable: false,
    };

    await prisma.room.create({
      data: room,
    });

    booking = {
      id: randomUUID(),
      roomId: room.id,
      days: 5,
      customer: "Alex",
      email: "alex@email.com",
      isActive: true,
    };

    await prisma.booking.create({
      data: booking,
    });
  });

  test("/bookings/:id (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get(`/bookings/${booking.id}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("room", {
      ...room,
    });
    expect(response.body).toHaveProperty("id", booking.id);
    expect(response.body).toHaveProperty("days", 5);
    expect(response.body).toHaveProperty("customer", "Alex");
    expect(response.body).toHaveProperty("email", "alex@email.com");
    expect(response.body).toHaveProperty("isActive", true);
  });
});
