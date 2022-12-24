import {Injectable} from "@nestjs/common";
import { Model } from "mongoose";
import {TrackingModel} from "../models/tracking.model";
import {InjectModel} from "@nestjs/mongoose";
import { ObjectId } from 'mongodb';

import {ITrackingService} from "./itracking.service";
import {Tracking} from "../common/types";
import {StatusTypes} from "../enums";
import {CommonUtils} from "../common/common-utils";
import {RequiredFieldsException} from "../exceptions/required-fields.exception";
import {TrackingDto} from "../dto/tracking.dto";

@Injectable()
export class TrackingService implements ITrackingService{
    constructor(
        @InjectModel(TrackingModel.name)
        private trackingModel: Model<Tracking>) {}

    public async createTracking(tracking: TrackingDto): Promise<{ _id: ObjectId | undefined }> {
        if (!tracking || (tracking && !Object.keys(tracking).length)) {
            throw new RequiredFieldsException('Tracking object is empty')
        }

        const formattedTracking = {
            status: StatusTypes.Active
        };

        const requiredFields = ['searchOptions','searchText'];

        const errors = [];

        requiredFields.forEach((field) => {
            if (!tracking[field]) {
                errors.push(`The field ${field} is absent in object`)
            }
        })

        if (errors.length) {
            throw new RequiredFieldsException(errors.join(';'))
        }

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

    public async updateTracking(_id: string, bodyParams: any): Promise<{ updated: boolean }> {
        if (!bodyParams || (bodyParams && !Object.keys(bodyParams).length)) {
            return {
                updated: false
            }
        }

        const trackingBeforeUpdate = await this.trackingModel.findOne({_id: new ObjectId(_id)});

        const updatedObject = {};

        const keys = Object.keys(trackingBeforeUpdate).filter((keyItem) => ['searchText', 'searchOptions', 'status'].includes(keyItem));

        keys.forEach((item) => {
            if (bodyParams[item] && item !== 'searchOptions') {
                updatedObject[item] = bodyParams[item]
            } else if (bodyParams[item] && item === 'searchOptions') {
                ['inChannels', 'inChats'].forEach((keyItem) => {
                    if (bodyParams[item][keyItem]) {
                        updatedObject[item][keyItem] = bodyParams[item][keyItem];
                    } else {
                        updatedObject[item][keyItem] = trackingBeforeUpdate[item][keyItem];
                    }
                });
            } else {
                updatedObject[item] = trackingBeforeUpdate[item]
            }
        })

        const updated = await this.trackingModel.updateOne({_id: new ObjectId(_id)}, {$set: {...updatedObject}})

        return {
            updated: !!updated.modifiedCount
        };
    }

    public async changeStatus(bodyParams: any): Promise<{ changed: boolean }> {
        const errors = [];

        ['trackingId', 'status'].forEach((field) => {
            if (!bodyParams[field]) {
                errors.push(`${field} is mandatory`)
            }
        });

        if (errors.length) {
            throw new RequiredFieldsException(errors.join(';'))
        }

        const result = await this.trackingModel.updateOne({_id: new ObjectId(bodyParams.trackingId)}, {
            $set: {status: bodyParams.status}
        })

        return {
            changed: !!result.modifiedCount
        };
    }
}
