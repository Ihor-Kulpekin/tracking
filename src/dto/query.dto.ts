import {StatusTypes} from "../enums";
import {IsEnum, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class QueryDto {

    @IsNumber()
    @ApiProperty({name: 'limit', example: '10'})
    limit: string;

    @IsNumber()
    @ApiProperty({name: 'skip', example: '10'})
    skip: number;

    @IsString()
    @ApiProperty({name: 'sort', example: 'createdAt:desc'})
    sort: string

    @IsEnum(StatusTypes)
    @ApiProperty({name: 'status', enum: StatusTypes, example: StatusTypes.Active, required: false})
    status: StatusTypes
}
