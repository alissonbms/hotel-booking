import Booking from "@/entities/Booking";
import BookingList from "@/entities/BookingList";
import { faker } from "@faker-js/faker";

describe("Test the BookingList entity", () => {
  test("Should initiate as a empty bookings array", () => {
    const newBookingList = new BookingList();

    expect(newBookingList.getBookings()).toHaveLength(0);
  });
  test("Should add bookings to the bookings array", () => {
    const newBookingList = new BookingList();

    const bookings: Booking[] = [
      {
        customer: faker.person.fullName(),
        email: faker.internet.email(),
        id: faker.database.collation(),
        days: 4,
        isActive: true,
        room: {
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: true,
          hasWifi: true,
          id: faker.database.collation(),
          image: faker.image.url(),
          isAvailable: true,
          name: faker.company.name(),
          price: parseFloat(faker.commerce.price()),
        },
      },
      {
        customer: faker.person.fullName(),
        email: faker.internet.email(),
        id: faker.database.collation(),
        days: 2,
        isActive: true,
        room: {
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: true,
          hasWifi: true,
          id: faker.database.collation(),
          image: faker.image.url(),
          isAvailable: true,
          name: faker.company.name(),
          price: parseFloat(faker.commerce.price()),
        },
      },
      {
        customer: faker.person.fullName(),
        email: faker.internet.email(),
        id: faker.database.collation(),
        days: 6,
        isActive: true,
        room: {
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: true,
          hasWifi: true,
          id: faker.database.collation(),
          image: faker.image.url(),
          isAvailable: true,
          name: faker.company.name(),
          price: parseFloat(faker.commerce.price()),
        },
      },
    ];

    newBookingList.setBookings(bookings);

    expect(newBookingList.getBookings()[0].customer).toBe(bookings[0].customer);

    expect(newBookingList.getBookings()).toHaveLength(3);
  });
  test("Should delete a valid booking from the bookings array", () => {
    const newBookingList = new BookingList();

    const bookings: Booking[] = [
      {
        customer: faker.person.fullName(),
        email: faker.internet.email(),
        id: faker.database.collation(),
        days: 4,
        isActive: true,
        room: {
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: true,
          hasWifi: true,
          id: faker.database.collation(),
          image: faker.image.url(),
          isAvailable: true,
          name: faker.company.name(),
          price: parseFloat(faker.commerce.price()),
        },
      },
      {
        customer: faker.person.fullName(),
        email: faker.internet.email(),
        id: faker.database.collation(),
        days: 2,
        isActive: true,
        room: {
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: true,
          hasWifi: true,
          id: faker.database.collation(),
          image: faker.image.url(),
          isAvailable: true,
          name: faker.company.name(),
          price: parseFloat(faker.commerce.price()),
        },
      },
      {
        customer: faker.person.fullName(),
        email: faker.internet.email(),
        id: faker.database.collation(),
        days: 6,
        isActive: true,
        room: {
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: true,
          hasWifi: true,
          id: faker.database.collation(),
          image: faker.image.url(),
          isAvailable: true,
          name: faker.company.name(),
          price: parseFloat(faker.commerce.price()),
        },
      },
    ];

    newBookingList.setBookings(bookings);
    expect(newBookingList.getBookings()).toHaveLength(3);
    expect(newBookingList.getBookings()[0].customer).toBe(bookings[0].customer);

    newBookingList.deleteBooking(bookings[0]);

    expect(newBookingList.getBookings()[0].customer).not.toBe(
      bookings[0].customer,
    );

    expect(newBookingList.getBookings()).toHaveLength(2);
  });

  test("Should NOT delete a invalid booking from the bookings array", () => {
    const newBookingList = new BookingList();

    const bookings: Booking[] = [
      {
        customer: faker.person.fullName(),
        email: faker.internet.email(),
        id: faker.database.collation(),
        days: 4,
        isActive: true,
        room: {
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: true,
          hasWifi: true,
          id: faker.database.collation(),
          image: faker.image.url(),
          isAvailable: true,
          name: faker.company.name(),
          price: parseFloat(faker.commerce.price()),
        },
      },
      {
        customer: faker.person.fullName(),
        email: faker.internet.email(),
        id: faker.database.collation(),
        days: 2,
        isActive: true,
        room: {
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: true,
          hasWifi: true,
          id: faker.database.collation(),
          image: faker.image.url(),
          isAvailable: true,
          name: faker.company.name(),
          price: parseFloat(faker.commerce.price()),
        },
      },
      {
        customer: faker.person.fullName(),
        email: faker.internet.email(),
        id: faker.database.collation(),
        days: 6,
        isActive: true,
        room: {
          hasAir: true,
          hasKitchen: true,
          isPetFriendly: true,
          hasWifi: true,
          id: faker.database.collation(),
          image: faker.image.url(),
          isAvailable: true,
          name: faker.company.name(),
          price: parseFloat(faker.commerce.price()),
        },
      },
    ];

    const unknownBooking: Booking = {
      id: "d40cfc6b-cd65-426e-98fe-45b903fa91a7.unknownBooking",
      customer: faker.person.fullName(),
      email: faker.internet.email(),
      days: 6,
      isActive: true,
      room: {
        hasAir: true,
        hasKitchen: true,
        isPetFriendly: true,
        hasWifi: true,
        id: faker.database.collation(),
        image: faker.image.url(),
        isAvailable: true,
        name: faker.company.name(),
        price: parseFloat(faker.commerce.price()),
      },
    };

    newBookingList.setBookings(bookings);
    expect(newBookingList.getBookings()).toHaveLength(3);

    expect(() => newBookingList.deleteBooking(unknownBooking)).toThrow(
      "Booking not found",
    );

    expect(newBookingList.getBookings()).toHaveLength(3);
  });
});
