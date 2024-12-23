import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "@/app.module";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { DatabaseModule } from "@/infra/database/database.module";
import { randomUUID } from "node:crypto";

describe("ListRoomsController (e2e)", () => {
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

    await prisma.room.create({
      data: {
        id: randomUUID(),
        name: "Amazing room",
        price: 29345,
        image: "room-image.png",
        hasAir: true,
        hasKitchen: true,
        hasWifi: false,
        isPetFriendly: false,
        isAvailable: true,
      },
    });
  });

  test("/rooms (GET)", async () => {
    const response = await request(app.getHttpServer()).get("/rooms").send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});
