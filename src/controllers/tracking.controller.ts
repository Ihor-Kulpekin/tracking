import {Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import {TrackingService} from "../services/tracking.service";

@Controller('tracking')
export class TrackingController {

    constructor(private readonly trackingService: TrackingService) {
    }

    @Get()
    public async getTrackings(@Query() query): Promise<any> {
        return this.trackingService.getTrackings(query)
    }

    @Post()
    public async createTracking(@Body() body): Promise<any>{
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
