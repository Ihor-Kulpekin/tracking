import {StatusTypes} from "../enums";
import {IsEmpty, IsEnum, IsNumber, IsString} from "class-validator";
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
    @IsEmpty()
    @ApiProperty({name: 'status', enum: StatusTypes, example: StatusTypes.Active, required: false})
    status: StatusTypes

    @IsEmpty()
    @ApiProperty({name: 'filters', example: JSON.stringify({name: 'test'})})
    filters: any
}
