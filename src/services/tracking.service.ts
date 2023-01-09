import {Injectable} from "@nestjs/common";
import { Model } from "mongoose";
import {TrackingModel} from "../models/tracking.model";
import {InjectModel} from "@nestjs/mongoose";
import { ObjectId } from 'mongodb';

import {ITrackingService} from "./itracking.service";
import {Tracking} from "../common/types";
import {StatusTypes} from "../enums";
import {CommonUtils} from "../common/common-utils";
import {CreateTrackingDto} from "../dto/create-tracking.dto";
import {ChangeStatusDto} from "../dto/change-status.dto";
import {UpdateTrackingDto} from "../dto/update-tracking.dto";

@Injectable()
export class TrackingService implements ITrackingService{
    constructor(
        @InjectModel(TrackingModel.name)
        private trackingModel: Model<Tracking>) {}

    public async createTracking(tracking: CreateTrackingDto): Promise<{ _id: ObjectId | undefined }> {
        const formattedTracking = {
            status: StatusTypes.Active
        };

        Object.keys(tracking).forEach((key) => {
            formattedTracking[key] = tracking[key];
        })

        const insertedTracking = await this.trackingModel.create(formattedTracking);

        return {
            _id: insertedTracking?.id,
        };
    }

    public async deleteTracking(_id: string): Promise<{ deleted: boolean }> {
        const deleted = await this.trackingModel.remove({_id: new ObjectId(_id)})

        return {
            deleted: !!deleted?.totalCount
        };
    }

    public async getTrackings(query: any): Promise<{ totalCount: number; items: Tracking[] }> {
        const filters = CommonUtils.getFilters(query);
        const projection = CommonUtils.getOptions(query);

        const items: any = await this.trackingModel.find({...filters}).skip(projection.skip).limit(projection.limit);
        const totalCount: any = await this.trackingModel.count({...filters});

        return {
            items,
            totalCount
        };
    }

    public async updateTracking(_id: string, bodyParams: UpdateTrackingDto): Promise<{ updated: boolean }> {
        await this.trackingModel.updateOne({_id: new ObjectId(_id)}, {$set: {...bodyParams}});

        return {
            updated: !!Object.keys(bodyParams).length
        };
    }

    public async changeStatus(bodyParams: ChangeStatusDto): Promise<{ changed: boolean }> {
        const result = await this.trackingModel.updateOne({_id: new ObjectId(bodyParams.trackingId)}, {
            $set: {status: bodyParams.status}
        })

        return {
            changed: !!result.modifiedCount
        };
    }
}
