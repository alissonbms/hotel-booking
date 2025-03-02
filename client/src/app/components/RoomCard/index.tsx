import Room from "@/entities/Room";
import styles from "./styles.module.scss";

interface IRoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: IRoomCardProps) => {
  return (
    <div className={`${styles.container}`}>
      <h2>{room.name}</h2>
    </div>
  );
};

export default RoomCard;
