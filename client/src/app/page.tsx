"use client";

import styles from "./styles/page.module.scss";
import Logo from "./components/Logo";
import { Button } from "hotel-booking-components-library";

export default function Home() {
  return (
    <div className={styles.container}>
      <header>
        <Logo />

        <Button colors="orange" variant="normal" width={206}>
          Reservar quarto
        </Button>
        <Button colors="orange__outline" variant="normal" width={206}>
          Consultar reserva
        </Button>
      </header>

      <Button colors="orange__outline" variant="normal" width={206}>
        Descobrir agora
      </Button>
    </div>
  );
}
