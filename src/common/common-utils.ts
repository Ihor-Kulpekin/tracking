export class CommonUtils {
    static getFilters(query: any) {
        const filters = {};

        const keys = Object.keys(query).filter((item) => !['limit', 'skip', 'sort'].includes(item));

        if (keys.length) {
            keys.forEach((keyItem) => {
                filters[keyItem] = query[keyItem]
            })
        }

        return filters
    }

    static getOptions(query: any) {
        const options: any = {};

        if (query) {
            if(query.limit) {
                options.limit = query.limit
            }

            if (query.skip) {
                options.skip = query.skip
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
