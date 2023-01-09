import {Tracking} from "../common/types";
import { ObjectId } from 'mongodb';
import {CreateTrackingDto} from "../dto/create-tracking.dto";
import {ChangeStatusDto} from "../dto/change-status.dto";

export interface ITrackingService {
    getTrackings(query: any): Promise<{ totalCount: number; items: Tracking[] }>;
    createTracking(tracking: CreateTrackingDto): Promise<{ _id: ObjectId | undefined }>;
    updateTracking(_id: string, bodyParams: any): Promise<{updated: boolean}>;
    deleteTracking(_id: string): Promise<{ deleted: boolean }>;
    changeStatus(bodyParams: ChangeStatusDto): Promise<{changed: boolean}>
}
