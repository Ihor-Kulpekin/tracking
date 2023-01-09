import {CreateTrackingDto} from "../dto/create-tracking.dto";
import {ChangeStatusDto} from "../dto/change-status.dto";
import {UpdateTrackingDto} from "../dto/update-tracking.dto";
import {
    ResponseChangeStatusTrackingDto,
    ResponseCreateTrackingDto,
    ResponseDeleteTrackingDto,
    ResponseListTrackingDto,
    ResponseUpdateTrackingDto
} from '../dto/response.dto';

export interface ITrackingService {
    getTrackings(query: any): Promise<ResponseListTrackingDto>;
    createTracking(tracking: CreateTrackingDto): Promise<ResponseCreateTrackingDto>;
    updateTracking(_id: string, bodyParams: UpdateTrackingDto): Promise<ResponseUpdateTrackingDto>;
    deleteTracking(_id: string): Promise<ResponseDeleteTrackingDto>;
    changeStatus(bodyParams: ChangeStatusDto): Promise<ResponseChangeStatusTrackingDto>
}
