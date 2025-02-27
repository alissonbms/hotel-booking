import Logo from "../components/Logo";
import styles from "./page.module.scss";

const Rooms = () => {
  return (
    <main className={styles.container}>
      <header>
        <Logo />
      </header>

      <h2>Available rooms</h2>

      <ul>
        <li>Super room</li>
      </ul>
    </main>
  );
};

export default Rooms;
