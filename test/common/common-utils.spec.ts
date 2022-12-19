import {CommonUtils} from "../../src/common/common-utils";
import {INestApplication} from "@nestjs/common";

describe('CommonUtils', () => {
    it('getFilters empty', () => {
        const resultFilters = CommonUtils.getFilters({});

        expect(resultFilters).toStrictEqual({});
    })

    it('getFilters not empty', () => {
        const testQuery = {name: 'testName'};

        const resultFilters = CommonUtils.getFilters(testQuery);

        expect(resultFilters).toStrictEqual(testQuery);
    })

    it('getOptions', () => {
        const testQuery = {limit: '10', skip: '0', sort: 'created_at:desc'};

        const resultFilters = CommonUtils.getOptions(testQuery);

        expect(resultFilters).toStrictEqual({limit: Number(testQuery.limit), skip: Number(testQuery.skip), sort: { created_at: -1}});
    })
})
