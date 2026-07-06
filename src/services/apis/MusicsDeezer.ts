import { MusicDezzerModel } from "@models/musicDezzer";

export const DEEZER_BASE_URL = "https://api.deezer.com";

export type DeezerListResponse<T> = {
    data: T[];
    total: number;
    next?: string;
};

export type DeezerChartResponse = {
    tracks: DeezerListResponse<MusicDezzerModel>;
};

export const MusicsDeezerApi = {
    chartUrl: () => `${DEEZER_BASE_URL}/chart`,
    searchUrl: () => `${DEEZER_BASE_URL}/search`,
    byIdUrl: (id: number) => `${DEEZER_BASE_URL}/track/${id}`,
};
