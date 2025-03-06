import { formattedPriceUSD } from "@/utils/formatters";
import {
  Button,
  Modal,
  NotificationDialog,
} from "hotel-booking-components-library";
import Image from "next/image";
import styles from "./styles.module.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";

interface INewBookingModalProps {
  open: boolean;
  handleClose: () => void;
}
const NewBookingModal = ({ open, handleClose }: INewBookingModalProps) => {
  const { currentRoom } = useAppStore();
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  const handleCloseNotificationDialog = () => {
    setSuccess(false);
  };

  const handleNextLocation = () => {
    handleClose();
    router.replace("/my-booking");
  };

  return (
    <>
      {!success && (
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
                    {currentRoom.hasAir && (
                      <span>&bull; Air-conditioning </span>
                    )}
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

            <form
              onSubmit={handleSubmit}
              className={`${styles["form"]} ${styles["custom-padding"]}`}
            >
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
                <Button
                  type="submit"
                  colors="orange"
                  variant="rounded"
                  height={51}
                  width={214}
                >
                  Confirm booking
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}
      <NotificationDialog
        type="success"
        open={success}
        title="Booking made!"
        description="You will receive an email with
more information."
        actionText="Close"
        handleClose={handleCloseNotificationDialog}
        handleNextLocation={handleNextLocation}
      />
    </>
  );
};

export default NewBookingModal;
