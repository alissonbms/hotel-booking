import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { EmployeeRepository } from "@/domain/employee/repositories/employee-repository";
import { RoomRepository } from "@/domain/employee/repositories/room-repository";
import { BookingRepository } from "@/domain/booking/repositories/booking-repository";
import { EmployeePrismaRepository } from "./repositories/employee-prisma-repository";
import { RoomPrismaRepository } from "./repositories/room-prisma-repository";
import { BookingPrismaRepository } from "./repositories/booking-prisma-repository";

@Module({
  providers: [
    PrismaService,
    { provide: EmployeeRepository, useClass: EmployeePrismaRepository },
    { provide: RoomRepository, useClass: RoomPrismaRepository },
    { provide: BookingRepository, useClass: BookingPrismaRepository },
  ],
  exports: [
    PrismaService,
    EmployeeRepository,
    RoomRepository,
    BookingRepository,
  ],
})
export class PrismaModule {}
