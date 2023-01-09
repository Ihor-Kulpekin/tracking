import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {SearchOptions} from "../common/types";

@Schema({
    timestamps: true,
    versionKey: false,
})
export class TrackingModel {
    @Prop({required: true})
    searchText: string;

    @Prop({type: Object, required: true, inChannels: true, inChats: false})
    searchOptions: SearchOptions;

    @Prop()
    status: string;
}

export const TrackingSchema = SchemaFactory.createForClass(TrackingModel);
