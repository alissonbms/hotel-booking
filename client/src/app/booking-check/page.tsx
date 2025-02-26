"use client";

import styles from "./styles.module.scss";
import { Button, Input } from "hotel-booking-components-library";
import Logo from "../components/Logo";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const BookingCheck = () => {
  const router = useRouter();
  const correctCode = "d4543ef4-40d3-423a-8a93-ecd7d79f1d5f";
  const [error, setError] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setError(false);

    if (input !== correctCode) {
      setError(true);
      return;
    }

    router.push("/my-booking");
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Logo size={38} />
        <div className={styles["form--input"]}>
          <strong>Enter your booking code</strong>
          <Input
            type="text"
            placeholder="Paste here your code"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </div>

        {error && (
          <span data-testid="error">
            No bookings found with the code provided. Please check the code, and
            click the “Check booking” button again, or view the rooms available
            for booking.
          </span>
        )}
        <div className={styles["form--buttons"]}>
          <Button colors="orange" variant="normal" width={200}>
            Check booking
          </Button>
          {error && (
            <Button colors="orange__outline" variant="normal" width={200}>
              See available rooms
            </Button>
          )}
        </div>
      </form>
    </main>
  );
};

export default BookingCheck;
