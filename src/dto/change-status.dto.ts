import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ChangeStatusDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    trackingId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    status: string
}
