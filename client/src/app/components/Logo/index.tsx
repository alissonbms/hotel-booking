import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <h1>Cubic Hotel</h1>
      <Image src="./assets/logo.svg" alt="Cubic Hotel" height={24} width={24} />
    </div>
  );
};

export default Logo;
