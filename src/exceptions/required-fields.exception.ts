import {BadRequestException} from "@nestjs/common";

export class RequiredFieldsException extends BadRequestException {
    constructor(message: string) {
        super(message);
    }
}
