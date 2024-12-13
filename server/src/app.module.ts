import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { validate } from "../src/env.validation";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validate }), DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
