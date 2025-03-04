import Image from "next/image";
import styles from "./page.module.scss";
import Link from "next/link";

interface ILogoProps {
  size?: number;
}

const Logo = ({ size = 24 }: ILogoProps) => {
  return (
    <Link href="/" className={styles.container}>
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
    </Link>
  );
};

export default Logo;
