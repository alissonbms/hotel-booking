import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { validate } from "../src/env.validation";
import { DatabaseModule } from "./infra/database/database.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validate }), DatabaseModule],
})
export class AppModule {}
