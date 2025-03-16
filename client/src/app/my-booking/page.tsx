"use client";

import { Button } from "hotel-booking-components-library";
import styles from "./page.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";
import { formattedPriceUSD } from "@/utils/formatters";

const MyBooking = () => {
  const router = useRouter();
  const { currentBooking } = useAppStore();
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
              <span>{currentBooking.id}</span>
            </div>
            <span>Check your booking data:</span>
          </div>
          <form>
            <div className={styles["container--content__input"]}>
              <div className="container-input">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  disabled
                  value={currentBooking.room.name}
                />
              </div>
              <div className="container-input">
                <label htmlFor="price-per-night">Price per night</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  disabled
                  value={formattedPriceUSD(currentBooking.room.price)}
                />
              </div>
            </div>

            <div className={styles["container--content__extras"]}>
              <strong>Extras</strong>
              <div className="container-checkbox">
                <input
                  type="checkbox"
                  id="wifi"
                  name="wifi"
                  value="wifi"
                  checked={currentBooking.room.hasWifi}
                  disabled
                />
                <label htmlFor="wifi">WiFi</label>
              </div>
              <div className="container-checkbox">
                <input
                  type="checkbox"
                  id="air-conditioning"
                  name="air-conditioning"
                  value="air-conditioning"
                  checked={currentBooking.room.hasAir}
                  disabled
                />
                <label htmlFor="air-conditioning">Air conditioning</label>
              </div>
              <div className="container-checkbox">
                <input
                  type="checkbox"
                  id="kitchen"
                  name="kitchen"
                  value="kitchen"
                  checked={currentBooking.room.hasKitchen}
                  disabled
                />
                <label htmlFor="kitchen">Kitchen</label>
              </div>
              <div className="container-checkbox">
                <input
                  type="checkbox"
                  id="pet-friendly"
                  name="pet-friendly"
                  value="pet-friendly"
                  checked={currentBooking.room.isPetFriendly}
                  disabled
                />
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
