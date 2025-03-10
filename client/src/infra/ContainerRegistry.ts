import "reflect-metadata";
import { Container } from "inversify";
import FetchAdapter from "./adapters/FetchAdapter";
import AxiosAdapter from "./adapters/AxiosAdapter";
import RoomsHttpGateway from "@/gateways/room/RoomsHttpGateway";
import RoomList from "@/entities/RoomList";
import BookingsHttpGateway from "@/gateways/booking/BookingsHttpGateway";
import BookingList from "@/entities/BookingList";

export const Registry = {
  FetchAdapter: Symbol.for("FetchAdapter"),
  AxiosAdapter: Symbol.for("AxiosAdapter"),
  RoomsHttpGateway: Symbol.for("RoomsHttpGateway"),
  RoomList: Symbol.for("RoomList"),
  BookingsHttpGateway: Symbol.for("BookingsHttpGateway"),
  BookingList: Symbol.for("BookingList"),
};

export const container = new Container();

container.bind(Registry.FetchAdapter).toDynamicValue(() => {
  return new FetchAdapter();
});

container.bind(Registry.AxiosAdapter).toDynamicValue(() => {
  return new AxiosAdapter();
});

container.bind(Registry.RoomList).toDynamicValue(() => {
  return new RoomList();
});

container.bind(Registry.BookingList).toDynamicValue(() => {
  return new BookingList();
});

container.bind(Registry.RoomsHttpGateway).toDynamicValue((context) => {
  return new RoomsHttpGateway(
    context.container.get(Registry.AxiosAdapter),
    "http://localhost:3000",
  );
});

container.bind(Registry.BookingsHttpGateway).toDynamicValue((context) => {
  return new BookingsHttpGateway(
    context.container.get(Registry.AxiosAdapter),
    "http://localhost:3000",
  );
});
