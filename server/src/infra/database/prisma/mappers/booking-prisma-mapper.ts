import Identity from "@/core/entities/identity";
import Booking from "@/domain/booking/entities/booking";
import Room from "@/domain/employee/entities/room";
import Email from "@/domain/shared/value-objects/email";
import Money from "@/domain/shared/value-objects/money";
import { Booking as BookingPrisma, Prisma } from "@prisma/client";

type BookingDatabase = Prisma.BookingGetPayload<{
  include: {
    room: true;
  };
}>;

export class BookingPrismaMapper {
  static toDomain(entity: BookingDatabase): Booking {
    return Booking.create(
      {
        room: Room.create(
          {
            ...entity.room,
            price: Money.create(entity.room.price),
          },
          new Identity(entity.room.id),
        ),
        days: entity.days,
        customer: entity.customer,
        email: Email.create(entity.email),
        isActive: entity.isActive,
      },
      new Identity(entity.id),
    );
  }

  static toDatabase(entity: Booking): BookingPrisma {
    return {
      id: entity.id.toString(),
      roomId: entity.room.id.toString(),
      days: entity.days,
      customer: entity.customer,
      email: entity.email.value,
      isActive: entity.isActive,
    };
  }
}
