import Room from "@/entities/Room";
import Logo from "../components/Logo";
import styles from "./page.module.scss";
import RoomCard from "../components/RoomCard";

const Rooms = () => {
  const rooms: Room[] = [
    {
      id: "123456789",
      name: "Super room",
      price: 50000,
      image: "/assets/hotel-room-cover.jpg",
      hasWifi: true,
      hasAir: true,
      hasKitchen: true,
      isPetFriendly: false,
      isAvailable: false,
    },
    {
      id: "987654321",
      name: "New room",
      price: 50000,
      image: "/assets/hotel-room-cover.jpg",
      hasWifi: true,
      hasAir: true,
      hasKitchen: true,
      isPetFriendly: false,
      isAvailable: false,
    },
  ];
  return (
    <main className={`${styles.container} layout`}>
      <header>
        <div className="max-width">
          <Logo />
        </div>
      </header>

      <div className={`${styles.content} max-width`}>
        <h2>Available rooms</h2>
        {rooms.length ? (
          <ul className={`${styles["content--rooms"]} max-width`}>
            {rooms.map((room) => (
              <li key={room.id}>
                <RoomCard room={room} />
              </li>
            ))}
          </ul>
        ) : (
          <span>No rooms found</span>
        )}
      </div>
    </main>
  );
};

export default Rooms;
