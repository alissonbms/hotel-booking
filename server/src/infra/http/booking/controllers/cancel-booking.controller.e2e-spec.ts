import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "@/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { DatabaseModule } from "@/infra/database/database.module";
import { hash } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { randomUUID } from "node:crypto";
import { Booking, Employee, Room } from "@prisma/client";

describe("CancelBookingController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let employee: Employee;
  let room: Room;
  let booking: Booking;

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

  test("/bookings/:id (PATCH)", async () => {
    const token = jwt.sign(employee);

    expect(booking).toHaveProperty("isActive", true);

    const response = await request(app.getHttpServer())
      .patch(`/bookings/${booking.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(204);

    const cancelledBooking = await prisma.booking.findFirst({
      where: {
        id: booking.id,
      },
    });

    expect(cancelledBooking).toHaveProperty("isActive", false);

    const roomReAvailable = await prisma.room.findFirst({
      where: {
        id: room.id,
      },
    });

    expect(roomReAvailable).toHaveProperty("isAvailable", true);
  });
});
