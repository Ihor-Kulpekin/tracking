import {Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import {TrackingService} from "../services/tracking.service";
import {ApiOperation, ApiBody, ApiParam, ApiTags, ApiQuery} from "@nestjs/swagger";
import {CreateTrackingDto} from "../dto/create-tracking.dto";
import {UpdateTrackingDto} from "../dto/update-tracking.dto";
import {FindOneParams} from "../dto/find-one-params.dto";
import {ChangeStatusDto} from "../dto/change-status.dto";
import {QueryDto} from "../dto/query.dto";

@Controller('tracking')
@ApiTags('tracking')
export class TrackingController {

    constructor(private readonly trackingService: TrackingService) {
    }

    @Get()
    @ApiOperation({summary: 'Get List items'})
    public async getTrackings(@Query() query: QueryDto): Promise<any> {
        return this.trackingService.getTrackings(query)
    }


    @Post()
    @ApiOperation({ summary: 'Create Tracking item' })
    public async createTracking(@Body() trackingDto: CreateTrackingDto): Promise<any>{
        return this.trackingService.createTracking(trackingDto)
    }

    @Put('/:id')
    @ApiOperation({summary: 'Update Tracking item'})
    public async updateTracking(@Param() params: FindOneParams, @Body() updateTrackingDto: UpdateTrackingDto): Promise<any> {
        return this.trackingService.updateTracking(params.id, updateTrackingDto);
    }

    @Delete('/:id')
    @ApiOperation({summary: 'Delete Tracking item'})
    public async deleteTracking(@Param() params: FindOneParams): Promise<any> {
        return this.trackingService.deleteTracking(params.id);
    }

    @Post('/change-status')
    @ApiOperation({summary: 'Change Status Tracking item'})
    public async changeStatus(@Body() changeStatusDto: ChangeStatusDto): Promise<any> {
        return this.trackingService.changeStatus(changeStatusDto);
    }
}
