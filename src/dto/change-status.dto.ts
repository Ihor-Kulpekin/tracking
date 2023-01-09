import {IsNotEmpty, IsString} from "class-validator";

export class ChangeStatusDto {

    @IsString()
    @IsNotEmpty()
    trackingId: string;

    @IsString()
    @IsNotEmpty()
    status: string
}
