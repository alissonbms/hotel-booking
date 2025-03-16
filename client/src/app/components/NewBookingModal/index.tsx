import { formattedPriceUSD } from "@/utils/formatters";
import {
  Button,
  Modal,
  NotificationDialog,
} from "hotel-booking-components-library";
import Image from "next/image";
import styles from "./styles.module.scss";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";
import BookingsHttpGateway from "@/gateways/booking/BookingsHttpGateway";
import { container, Registry } from "@/infra/ContainerRegistry";

interface INewBookingModalProps {
  open: boolean;
  handleClose: () => void;
}
const NewBookingModal = ({ open, handleClose }: INewBookingModalProps) => {
  const router = useRouter();
  const { currentRoom, setCurrentBooking } = useAppStore();
  const render = useRef(0);
  const [bookingsHttp, setBookingsHttp] = useState<BookingsHttpGateway>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [days, setDays] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (render.current === 0) {
      setBookingsHttp(
        container.get<BookingsHttpGateway>(Registry.BookingsHttpGateway),
      );

      render.current = 1;
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = await bookingsHttp?.setBooking({
        customer: name,
        email: email,
        days: days,
        roomId: currentRoom.id,
      });

      if (data) {
        setCurrentBooking(data);
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
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
        <Modal width={700} height={850} open={open}>
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
                    placeholder="Enter the customer name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    id="email"
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="days">Days</label>
                  <input
                    name="days"
                    id="days"
                    type="number"
                    value={days}
                    onChange={(e) => setDays(e.target.valueAsNumber)}
                    data-testid="number-of-days-stay"
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
        actionText="Check booking"
        handleClose={handleCloseNotificationDialog}
        handleNextLocation={handleNextLocation}
      />
    </>
  );
};

export default NewBookingModal;
