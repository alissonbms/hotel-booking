import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { validate } from "../src/env.validation";
import { HttpModule } from "./infra/http/http.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validate }), HttpModule],
})
export class AppModule {}
