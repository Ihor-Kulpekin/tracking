import {CommonUtils} from "../../src/common/common-utils";
import {QueryDto} from "../../src/dto/query.dto";

describe('CommonUtils', () => {
    it('getFilters empty', () => {
        const resultFilters = CommonUtils.getFilters(<QueryDto>{});

        expect(resultFilters).toStrictEqual({});
    })

    it('getFilters not empty', () => {
        const testQuery: any = {filters: {
                name: 'testName'
            }};

        const resultFilters = CommonUtils.getFilters(testQuery);

        expect(resultFilters).toStrictEqual({...testQuery.filters});
    })

    it('getOptions', () => {
        const testQuery: any = {limit: '10', skip: '0', sort: 'created_at:desc', filters: JSON.stringify({})};

        const resultFilters = CommonUtils.getOptions(testQuery);

        expect(resultFilters).toStrictEqual({limit: Number(testQuery.limit), skip: Number(testQuery.skip), sort: { created_at: -1}});
    })
})
