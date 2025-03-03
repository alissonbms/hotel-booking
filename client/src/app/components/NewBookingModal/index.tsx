import { formattedPriceUSD } from "@/utils/formatters";
import { Button, Modal } from "hotel-booking-components-library";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useState } from "react";
import Room from "@/entities/Room";

interface INewBookingModalProps {
  open: boolean;
  handleClose: () => void;
}
const NewBookingModal = ({ open, handleClose }: INewBookingModalProps) => {
  const [currentRoom] = useState<Room>({
    id: "123789456",
    name: "Other room",
    price: 750,
    image: "/assets/hotel-room-cover.jpg",
    hasWifi: true,
    hasAir: true,
    hasKitchen: true,
    isPetFriendly: true,
    isAvailable: false,
  });
  return (
    <>
      <Modal width={700} height={670} open={open}>
        <div className={styles.content}>
          <div
            className={`${styles["content--header"]} ${styles["custom-padding"]}`}
          >
            <h2>New booking</h2>
            <span>Complete your booking below</span>
          </div>

          <div
            className={`${styles["content--room"]} ${styles["custom-padding"]}`}
          >
            <Image
              src={currentRoom.image}
              width={300}
              height={180}
              alt="hotel-room-cover"
            />
            <div className={styles["content--room__description"]}>
              <div>
                <h3>{currentRoom.name}</h3>
                <div className={styles.options}>
                  {currentRoom.hasWifi && <span>&bull; Wifi</span>}
                  {currentRoom.hasAir && <span>&bull; Air-conditioning </span>}
                  {currentRoom.hasKitchen && <span>&bull; Kitchen</span>}
                  {currentRoom.isPetFriendly && (
                    <span>&bull; Pet friendly</span>
                  )}
                </div>
              </div>
              <div className={styles.price}>
                <h2>{formattedPriceUSD(currentRoom.price)}</h2>
                <span>/ per night</span>
              </div>
            </div>
          </div>

          <form className={`${styles["form"]} ${styles["custom-padding"]}`}>
            <div className={styles["form__inputs"]}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  name="name"
                  id="name "
                  type="text"
                  placeholder="Enter the guest name"
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  id="email"
                  type="text"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className={styles["form__buttons"]}>
              <Button
                colors="white"
                variant="rounded"
                height={51}
                width={132}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button colors="orange" variant="rounded" height={51} width={214}>
                Confirm booking
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default NewBookingModal;
