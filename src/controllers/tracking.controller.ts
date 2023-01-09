import {Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import {TrackingService} from "../services/tracking.service";
import {ApiOperation, ApiBody, ApiQuery, ApiParam, ApiTags} from "@nestjs/swagger";
import {StatusTypes} from "../enums";
import {CreateTrackingDto} from "../dto/create-tracking.dto";
import {UpdateTrackingDto} from "../dto/update-tracking.dto";
import {FindOneParams} from "../dto/find-one-params.dto";
import {ChangeStatusDto} from "../dto/change-status.dto";

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
    @ApiBody({type: CreateTrackingDto,  required: true})
    public async createTracking(@Body() trackingDto: CreateTrackingDto): Promise<any>{
        return this.trackingService.createTracking(trackingDto)
    }

    @Put('/:id')
    @ApiOperation({summary: 'Update Tracking item'})
    @ApiParam({name: '_id', type: String, required: true})
    @ApiBody({required: true})
    public async updateTracking(@Param() params: FindOneParams, @Body() updateTrackingDto: UpdateTrackingDto): Promise<any> {
        return this.trackingService.updateTracking(params.id, updateTrackingDto);
    }

    @Delete('/:id')
    @ApiOperation({summary: 'Delete Tracking item'})
    @ApiParam({name: '_id', type: String})
    public async deleteTracking(@Param() params: FindOneParams): Promise<any> {
        return this.trackingService.deleteTracking(params.id);
    }

    @Post('/change-status')
    @ApiOperation({summary: 'Change Status Tracking item'})
    public async changeStatus(@Body() changeStatusDto: ChangeStatusDto): Promise<any> {
        return this.trackingService.changeStatus(changeStatusDto);
    }
}
