import Image from "next/image";
import styles from "./page.module.scss";

const Logo = () => {
  return (
    <div className={styles.container}>
      <h1>Cubic Hotel</h1>
      <Image src="./assets/logo.svg" alt="Cubic Hotel" height={24} width={24} />
    </div>
  );
};

export default Logo;
