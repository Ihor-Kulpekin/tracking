import {Model} from "mongoose";

import {TrackingController} from "../../src/controllers/tracking.controller";
import {TrackingService} from "../../src/services/tracking/tracking.service";
import {Tracking} from "../../src/common/types";
import {StatusTypes} from "../../src/enums";
import {Test, TestingModule} from "@nestjs/testing";

describe('TrackingController', () => {
    let trackingController: TrackingController;
    let trackingService: TrackingService;

    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [TrackingController],
            providers: [TrackingService]
        }).compile();

        trackingController = app.get<TrackingController>(TrackingController)
    })

    describe('getTrackings',  () => {
        it('should return list of trackings', async () => {
            const testList = [{searchText: 'searchText', searchOptions: {inChannels: true, inChats: false}, status: StatusTypes.Active}];

            jest.spyOn(trackingService, 'getTrackings').mockImplementation(async (): Promise<any> => {
                return {
                    items: testList, totalCount: 1
                }
            });

            const result = await trackingController.getTrackings({});
            console.log('result', result);
            expect(result).toBe(testList);
        })
    })
})
