"use client";

import styles from "./styles/page.module.scss";
import Logo from "./components/Logo";
import { Button } from "hotel-booking-components-library";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className={`${styles.main} layout`}>
      <header className={`${styles.header} max-width`}>
        <Logo />

        <div className={styles["header--buttons"]}>
          <Link href="rooms">
            <Button colors="orange" variant="normal" width={206}>
              Reservar quarto
            </Button>
          </Link>
          <Link href="/reservation-consult">
            <Button colors="orange__outline" variant="normal" width={206}>
              Consultar reserva
            </Button>
          </Link>
        </div>
      </header>

      <div className={`${styles.content} max-width`}>
        <div className={styles["content-left"]}>
          <h1>
            Comece sua emocionante <span>jornada</span> conosco.
          </h1>
          <p>
            Uma equipe de experientes profissionais de turismo irá fornecer-lhe
            os melhores conselhos e dicas para o seu hospedagem de desejo.
          </p>
          <Link href="/rooms">
            <Button colors="orange__outline" variant="normal" width={206}>
              Descobrir agora
            </Button>
          </Link>
        </div>
        <div className={styles["content-right"]}>
          <Image
            src="/assets/tourist-with-thumb.png"
            alt="tourist"
            className={styles["content-right--tourist"]}
            width={450}
            height={530}
            priority
          />

          <Image
            src="/assets/air-planes.svg"
            alt="airplane"
            className={styles["content-right--airplane"]}
            width={800}
            height={191}
          />

          <Image
            src="/assets/orange-elipse.svg"
            alt="elipse"
            className={styles["content-right--elipse"]}
            width={650}
            height={250}
          />

          <Image
            src="/assets/award.svg"
            alt="award"
            className={styles["content-right--award"]}
            width={785}
            height={168}
          />

          <Image
            src="/assets/rate.svg"
            alt="rate"
            className={styles["content-right--rate"]}
            width={785}
            height={168}
          />

          <Image
            src="/assets/map-explore.svg"
            alt="map"
            className={styles["content-right--map"]}
            width={785}
            height={168}
          />
        </div>
      </div>
    </div>
  );
}
