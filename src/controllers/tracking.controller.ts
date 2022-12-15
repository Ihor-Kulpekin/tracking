import {Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import {TrackingService} from "../services/tracking.service";
import {ApiOperation, ApiBody, ApiQuery, ApiParam, ApiTags, PartialType, ApiBodyOptions} from "@nestjs/swagger";
import {Tracking} from "../common/types";
import {TrackingModel} from "../models/tracking.model";
import {StatusTypes} from "../enums";

@Controller('tracking')
@ApiTags('tracking')
export class TrackingController {

    constructor(private readonly trackingService: TrackingService) {
    }

    @Get()
    @ApiOperation({summary: 'Get List items'})
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
    @ApiOperation({summary: 'Update Tracking item'})
    @ApiParam({name: '_id', type: String})
    @ApiBody({required: false, type: PartialType<Tracking>})
    public async updateTracking(@Param() _id: string, @Body() body): Promise<any> {
        return this.trackingService.updateTracking(_id, body);
    }

    @Delete('/:id')
    @ApiOperation({summary: 'Delete Tracking item'})
    @ApiParam({name: '_id', type: String})
    public async deleteTracking(@Param() _id: string): Promise<any> {
        return this.trackingService.deleteTracking(_id);
    }

    @Post('/change-status')
    @ApiOperation({summary: 'Change Status Tracking item'})
    public async changeStatus(@Body() body): Promise<any> {
        return this.trackingService.changeStatus(body);
    }
}
