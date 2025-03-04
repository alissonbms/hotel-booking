import { BookingRepository } from "@/domain/booking/repositories/booking-repository";
import { PrismaService } from "../prisma.service";
import Booking from "@/domain/booking/entities/booking";
import { BookingPrismaMapper } from "../mappers/booking-prisma-mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BookingPrismaRepository implements BookingRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(booking: Booking): Promise<Booking> {
    const data = BookingPrismaMapper.toDatabase(booking);

    const newBooking = await this.prismaService.booking.create({
      data,
      include: {
        room: true,
      },
    });

    return BookingPrismaMapper.toDomain(newBooking);
  }

  async findMany(): Promise<Booking[]> {
    const bookings = await this.prismaService.booking.findMany({
      include: {
        room: true,
      },
    });

    return bookings.map(BookingPrismaMapper.toDomain);
  }

  async findById(id: string): Promise<Booking | null> {
    const booking = await this.prismaService.booking.findFirst({
      where: {
        id,
      },
      include: {
        room: true,
      },
    });

    if (!booking) {
      return null;
    }

    return BookingPrismaMapper.toDomain(booking);
  }

  async cancel(booking: Booking): Promise<void> {
    const data = BookingPrismaMapper.toDatabase(booking);

    await this.prismaService.booking.update({
      where: { id: data.id },
      data,
    });
  }

  async findByRoomId(roomId: string): Promise<Booking | null> {
    const booking = await this.prismaService.booking.findFirst({
      where: {
        roomId,
      },
      include: {
        room: true,
      },
    });

    if (!booking) {
      return null;
    }

    return BookingPrismaMapper.toDomain(booking);
  }
}
