import {Module} from "@nestjs/common";
import {TrackingController} from "../controllers/tracking.controller";
import {TrackingService} from "../services/tracking.service";
import {MongooseModule} from "@nestjs/mongoose";
import {TrackingModel, TrackingSchema} from "../models/tracking.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: TrackingModel.name, schema: TrackingSchema }])],
    controllers: [TrackingController],
    providers: [TrackingService]
})
export class TrackingModule {}
