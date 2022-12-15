import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TrackingModule} from "./modules/tracking.module";
import {DbModule} from "./modules/db.module";

@Module({
  imports: [TrackingModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
