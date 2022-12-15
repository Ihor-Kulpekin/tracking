import {Tracking} from "../common/types";
import { ObjectId } from 'mongodb';

export interface ITrackingService {
    getTrackings(query: any): Promise<{ totalCount: number; items: Tracking[] }>;
    createTracking(tracking: Tracking): Promise<{ _id: ObjectId | undefined }>;
    updateTracking(_id: string, bodyParams: any): Promise<{updated: boolean}>;
    deleteTracking(_id: string): Promise<{ deleted: boolean }>;
}
