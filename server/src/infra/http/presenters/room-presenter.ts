import Room from "@/domain/employee/entities/room";

export class RoomPresenter {
  static toHTTP(entity: Room) {
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
