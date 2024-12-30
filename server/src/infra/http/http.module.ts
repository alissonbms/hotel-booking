import { Module } from "@nestjs/common";
import { EmployeeModule } from "./employee/employee.module";
import { RoomModule } from "./room/room.module";
import { BookingModule } from "./booking/booking.module";
import UploadModule from "./upload/upload.module";

@Module({
  imports: [EmployeeModule, RoomModule, BookingModule, UploadModule],
  exports: [EmployeeModule, RoomModule, BookingModule, UploadModule],
})
export class HttpModule {}
