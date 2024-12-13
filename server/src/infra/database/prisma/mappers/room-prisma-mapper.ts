import Identity from "@/core/entities/identity";
import Room from "@/domain/employee/entities/room";
import Money from "@/domain/shared/value-objects/money";
import { Room as RoomDatabase } from "@prisma/client";

export class RoomPrismaMapper {
  static toDomain(entity: RoomDatabase): Room {
    return Room.create(
      {
        name: entity.name,
        price: Money.create(entity.price),
        image: entity.image,
        hasWifi: entity.hasWifi,
        hasAir: entity.hasAir,
        hasKitchen: entity.hasKitchen,
        isPetFriendly: entity.isPetFriendly,
        isAvailable: entity.isAvailable,
      },
      new Identity(entity.id),
    );
  }

  static toDatabase(entity: Room): RoomDatabase {
    return {
      id: entity.id.toString(),
      name: entity.name,
      price: entity.price.value,
      image: entity.image,
      hasWifi: entity.hasWifi,
      hasAir: entity.hasAir,
      hasKitchen: entity.hasKitchen,
      isPetFriendly: entity.isPetFriendly,
      isAvailable: entity.isAvailable,
    };
  }
}
