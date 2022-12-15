import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Schema as MongooseSchema} from 'mongoose';
import {SearchOptions} from "../common/types";

@Schema({
    timestamps: true,
    versionKey: false,
})
export class TrackingModel {
    @Prop({required: true})
    searchText: string;

    @Prop({required: true, type: MongooseSchema.Types.Mixed})
    searchOptions: Record<string, SearchOptions>;

    @Prop()
    status: string;
}

export const TrackingSchema = SchemaFactory.createForClass(TrackingModel);
