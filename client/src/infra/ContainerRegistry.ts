import "reflect-metadata";
import { Container } from "inversify";
import FetchAdapter from "./adapters/FetchAdapter";
import AxiosAdapter from "./adapters/AxiosAdapter";
import RoomsHttpGateway from "@/gateways/RoomsHttpGateway";
import RoomList from "@/entities/RoomList";

export const Registry = {
  FetchAdapter: Symbol.for("FetchAdapter"),
  AxiosAdapter: Symbol.for("AxiosAdapter"),
  RoomsHttpGateway: Symbol.for("RoomsHttpGateway"),
  RoomList: Symbol.for("RoomList"),
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

container.bind(Registry.RoomsHttpGateway).toDynamicValue((context) => {
  return new RoomsHttpGateway(
    context.container.get(Registry.FetchAdapter),
    "http://localhost:3000",
  );
});
