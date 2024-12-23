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
import { Employee, Room } from "@prisma/client";

describe("DeleteRoomController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let employee: Employee;
  let room: Room;

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

  test("/rooms/:id (DELETE)", async () => {
    const token = jwt.sign(employee);

    const oldRooms = await prisma.room.findMany();
    expect(oldRooms).toHaveLength(1);

    const response = await request(app.getHttpServer())
      .delete(`/rooms/${room.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(204);

    const rooms = await prisma.room.findMany();

    expect(rooms).toHaveLength(0);
  });
});
