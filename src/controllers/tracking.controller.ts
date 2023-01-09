import {Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import {TrackingService} from "../services/tracking.service";
import {ApiOperation, ApiTags, ApiResponse} from "@nestjs/swagger";
import {CreateTrackingDto} from "../dto/create-tracking.dto";
import {UpdateTrackingDto} from "../dto/update-tracking.dto";
import {FindOneParams} from "../dto/find-one-params.dto";
import {ChangeStatusDto} from "../dto/change-status.dto";
import {QueryDto} from "../dto/query.dto";
import {
    ResponseChangeStatusTrackingDto,
    ResponseCreateTrackingDto,
    ResponseDeleteTrackingDto,
    ResponseListTrackingDto,
    ResponseUpdateTrackingDto
} from "../dto/response.dto";

@Controller('tracking')
@ApiTags('tracking')
export class TrackingController {

    constructor(private readonly trackingService: TrackingService) {
    }

    @Get()
    @ApiOperation({summary: 'Get List items'})
    @ApiResponse({type: ResponseListTrackingDto})
    public async getTrackings(@Query() query: QueryDto): Promise<ResponseListTrackingDto> {
        return this.trackingService.getTrackings(query)
    }


    @Post()
    @ApiOperation({ summary: 'Create Tracking item' })
    @ApiResponse({type: ResponseCreateTrackingDto})
    public async createTracking(@Body() trackingDto: CreateTrackingDto): Promise<ResponseCreateTrackingDto>{
        return this.trackingService.createTracking(trackingDto)
    }

    @Put('/:id')
    @ApiOperation({summary: 'Update Tracking item'})
    @ApiResponse({type: ResponseUpdateTrackingDto})
    public async updateTracking(@Param() params: FindOneParams, @Body() updateTrackingDto: UpdateTrackingDto): Promise<ResponseUpdateTrackingDto> {
        return this.trackingService.updateTracking(params.id, updateTrackingDto);
    }

    @Delete('/:id')
    @ApiOperation({summary: 'Delete Tracking item'})
    @ApiResponse({type: ResponseDeleteTrackingDto})
    public async deleteTracking(@Param() params: FindOneParams): Promise<ResponseDeleteTrackingDto> {
        return this.trackingService.deleteTracking(params.id);
    }

    @Post('/change-status')
    @ApiOperation({summary: 'Change Status Tracking item'})
    @ApiResponse({type: ResponseChangeStatusTrackingDto})
    public async changeStatus(@Body() changeStatusDto: ChangeStatusDto): Promise<ResponseChangeStatusTrackingDto> {
        return this.trackingService.changeStatus(changeStatusDto);
    }
}
