
export interface SearchOptions {
    inChannels: boolean;
    inChats: boolean;
}

export interface Tracking {
    searchText: string;

    searchOptions: Record<string, SearchOptions>;

    status: string;
}
