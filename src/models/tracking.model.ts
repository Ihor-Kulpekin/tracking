import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Schema as MongooseSchema} from 'mongoose';
import {SearchOptions} from "../common/types";
import {ApiProperty} from "@nestjs/swagger";
import {StatusTypes} from "../enums";

@Schema({
    timestamps: true,
    versionKey: false,
})
export class TrackingModel {
    @Prop({required: true})
    @ApiProperty({type: String, default: 'default text'})
    searchText: string;

    @Prop({required: true, type: MongooseSchema.Types.Mixed})
    @ApiProperty({type: Object, default: {inChannels: false, inChats: false}})
    searchOptions: SearchOptions;

    @Prop()
    @ApiProperty({type: String, enum: StatusTypes, default: 'Активний'})
    status: string;
}

export const TrackingSchema = SchemaFactory.createForClass(TrackingModel);
