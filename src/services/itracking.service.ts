import {Tracking} from "../common/types";
import { ObjectId } from 'mongodb';
import {TrackingDto} from "../dto/tracking.dto";

export interface ITrackingService {
    getTrackings(query: any): Promise<{ totalCount: number; items: Tracking[] }>;
    createTracking(tracking: TrackingDto): Promise<{ _id: ObjectId | undefined }>;
    updateTracking(_id: string, bodyParams: any): Promise<{updated: boolean}>;
    deleteTracking(_id: string): Promise<{ deleted: boolean }>;
    changeStatus(bodyParams: any): Promise<{changed: boolean}>
}
