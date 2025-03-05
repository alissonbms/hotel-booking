"use client";

import Room from "@/entities/Room";
import Logo from "../components/Logo";
import styles from "./page.module.scss";
import RoomCard from "../components/RoomCard";
import { useEffect, useRef, useState } from "react";
import RoomsHttpGateway from "@/gateways/RoomsHttpGateway";
import { container, Registry } from "@/infra/ContainerRegistry";
import RoomList from "@/entities/RoomList";

const Rooms = () => {
  const render = useRef(0);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomList, setRoomList] = useState<RoomList>();
  const [roomsHttp, setRoomsHttp] = useState<RoomsHttpGateway>();

  useEffect(() => {
    (async () => {
      if (!roomsHttp) return;
      if (!roomList) return;

      const data = await roomsHttp.getRooms();
      roomList.setRooms(data);
      setRooms(data);
    })();
  }, [roomList, roomsHttp]);

  useEffect(() => {
    if (render.current === 0) {
      setRoomsHttp(container.get<RoomsHttpGateway>(Registry.RoomsHttpGateway));
      setRoomList(container.get<RoomList>(Registry.RoomList));

      render.current = 1;
    }
  }, []);

  return (
    <main className={`${styles.container} layout`}>
      <header>
        <div className="max-width">
          <Logo />
        </div>
      </header>

      <div className={`${styles.content} max-width`}>
        <h2>Available rooms</h2>
        {rooms.length ? (
          <ul className={`${styles["content--rooms"]} max-width`}>
            {rooms.map((room) => (
              <li key={room.id}>
                <RoomCard room={room} />
              </li>
            ))}
          </ul>
        ) : (
          <span>No rooms found</span>
        )}
      </div>
    </main>
  );
};

export default Rooms;
