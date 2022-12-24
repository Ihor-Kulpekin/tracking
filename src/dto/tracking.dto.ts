import {SearchOptions} from "../common/types";
import {ApiProperty} from "@nestjs/swagger";
import {StatusTypes} from "../enums";

export class TrackingDto {
    @ApiProperty({type: String, default: 'default text'})
    searchText: string;

    @ApiProperty({example: {inChannels: false, inChats: true}, default: {inChannels: false, inChats: true}})
    searchOptions: SearchOptions;

    @ApiProperty({type: String, enum: StatusTypes, default: 'Активний'})
    status: string;
}
