"use client";

import Room from "@/entities/Room";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Button } from "hotel-booking-components-library";
import { formattedPriceUSD } from "@/utils/formatters";
// import NewBookingModal from "../NewBookingModal";
// import { useState } from "react";

interface IRoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: IRoomCardProps) => {
  // const [open, setOpen] = useState(true);

  return (
    <div className={`${styles.container}`}>
      <Image
        src={room.image}
        alt={`${room.name} image cover`}
        width={496}
        height={282}
      />

      <div className={styles.content}>
        <div>
          <h2>{room.name}</h2>
          <div className={styles["content--options"]}>
            {room.hasWifi && <span>&bull; Wifi</span>}
            {room.hasAir && <span>&bull; Air-conditioning </span>}
            {room.hasKitchen && <span>&bull; Kitchen</span>}
            {room.isPetFriendly && <span>&bull; Pet friendly</span>}
          </div>
        </div>

        <div className={styles["content--card-bottom"]}>
          <div>
            <h2>{formattedPriceUSD(room.price)}</h2>
            <span>/ per night</span>
          </div>
          <Button colors="orange" variant="normal" width={188}>
            Book room
          </Button>
        </div>
      </div>

      {/* <NewBookingModal open={open} handleClose={() => setOpen(false)} /> */}
    </div>
  );
};

export default RoomCard;
