import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Schema as MongooseSchema} from 'mongoose';
import {SearchOptions} from "../common/types";
import {ApiProperty} from "@nestjs/swagger";

@Schema({
    timestamps: true,
    versionKey: false,
})
export class TrackingModel {
    @Prop({required: true})
    @ApiProperty({type: String, default: 'default text'})
    searchText: string;

    @Prop({required: true, type: MongooseSchema.Types.Mixed})
    @ApiProperty({default: {inChannels: false, inChats: false}})
    searchOptions: SearchOptions;

    @Prop()
    @ApiProperty({default: 'Активний'})
    status: string;
}

export const TrackingSchema = SchemaFactory.createForClass(TrackingModel);
