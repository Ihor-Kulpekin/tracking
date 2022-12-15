import {Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import {TrackingService} from "../services/tracking.service";
import {ApiOperation, ApiBody, ApiQuery} from "@nestjs/swagger";
import {SearchOptions, Tracking} from "../common/types";
import {TrackingModel, TrackingSchema} from "../models/tracking.model";
import {StatusTypes} from "../enums";

@Controller('tracking')
export class TrackingController {

    constructor(private readonly trackingService: TrackingService) {
    }

    @Get()
    @ApiQuery({name: 'limit', example: '10'})
    @ApiQuery({name: 'skip', example: '0'})
    @ApiQuery({name: 'sort', example: 'createdAt:desc'})
    @ApiQuery({name: 'status', enum: StatusTypes, example: StatusTypes.Active, required: false})
    public async getTrackings(@Query() query): Promise<any> {
        return this.trackingService.getTrackings(query)
    }


    @Post()
    @ApiOperation({ summary: 'Create Tracking item' })
    @ApiBody({type: TrackingModel,  required: true})
    public async createTracking(@Body() body: Tracking): Promise<any>{
        return this.trackingService.createTracking(body)
    }

    @Put('/:id')
    public async updateTracking(@Param() _id: string, @Body() body): Promise<any> {
        return this.trackingService.updateTracking(_id, body);
    }

    @Delete('/:id')
    public async deleteTracking(@Param() _id: string): Promise<any> {
        return this.trackingService.deleteTracking(_id);
    }

    @Post('/change-status')
    public async changeStatus(@Body() body): Promise<any> {
        return this.trackingService.changeStatus(body);
    }
}
