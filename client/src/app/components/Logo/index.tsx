import Image from "next/image";
import styles from "./page.module.scss";

interface ILogoProps {
  size?: number;
}

const Logo = ({ size = 24 }: ILogoProps) => {
  return (
    <div className={styles.container}>
      <h1
        style={{
          fontSize: `${size}px`,
        }}
      >
        Cubic Hotel
      </h1>
      <Image
        src="./assets/logo.svg"
        alt="Cubic Hotel image logo"
        height={size}
        width={size}
      />
    </div>
  );
};

export default Logo;
