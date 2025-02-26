"use client";

import { Button } from "hotel-booking-components-library";
import styles from "./page.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MyBooking = () => {
  const router = useRouter();
  return (
    <main className={`${styles.container} layout`}>
      <div className={`${styles["container--header"]} max-width`}>
        <h1>Bookings</h1>
        <Button
          colors="orange"
          variant="rounded"
          width={103}
          height={51}
          onClick={() => router.back()}
        >
          Go back
        </Button>
      </div>

      <div className={`${styles["container--content"]} max-width`}>
        <Image
          src="/assets/hotel-room-cover.jpg"
          alt="hotel room cover"
          width={580}
          height={405}
        />

        <div>
          <div className={styles["booking-code"]}>
            <div>
              <h3>Booking</h3>
              <span>123456789</span>
            </div>
            <span>Check your booking data:</span>
          </div>
          <form>
            <div className={styles["container--content__input"]}>
              <div className="container-input">
                <label htmlFor="name">Name</label>
                <input type="text" disabled />
              </div>
              <div className="container-input">
                <label htmlFor="price-per-night">Price per night</label>
                <input type="text" disabled />
              </div>
            </div>

            <div className={styles["container--content__extras"]}>
              <strong>Extras</strong>
              <div className="container-checkbox">
                <input type="checkbox" id="wifi" name="wifi" />
                <label htmlFor="wifi">Wi-Fi</label>
              </div>
              <div className="container-checkbox">
                <input
                  type="checkbox"
                  id="air-conditioning"
                  name="air-conditioning"
                />
                <label htmlFor="air-conditioning">Air conditioning</label>
              </div>
              <div className="container-checkbox">
                <input type="checkbox" id="kitchen" name="kitchen" />
                <label htmlFor="kitchen">Kitchen</label>
              </div>
              <div className="container-checkbox">
                <input type="checkbox" id="pet-friendly" name="pet-friendly" />
                <label htmlFor="pet-friendly">Pet friendly</label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default MyBooking;
