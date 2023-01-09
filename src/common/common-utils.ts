import {QueryDto} from "../dto/query.dto";

export class CommonUtils {
    static getFilters(query: QueryDto) {
        const filters = {};

        const keys = Object.keys(query).filter((item) => !['limit', 'skip', 'sort'].includes(item));

        if (keys.length) {
            keys.forEach((keyItem) => {
                filters[keyItem] = query[keyItem]
            })
        }

        return filters
    }

    static getOptions(query: QueryDto) {
        const options: any = {};

        if (query) {
            if(query.limit) {
                options.limit = Number(query.limit)
            }

            if (query.skip) {
                options.skip = Number(query.skip)
            }

            if (query.sort) {
                const keys = query.sort.split(':');

                if (keys[0]) {
                    options.sort = {};
                    options.sort[keys[0]] = keys[1] && keys[1] === 'desc' ? -1 : 1;
                }
            }

        }

        return options
    }
}
