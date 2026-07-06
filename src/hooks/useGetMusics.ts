import { MusicDezzerModel } from "@models/musicDezzer";
import { DeezerChartResponse, MusicsDeezerApi } from "@services";
import { InfiniteData, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useGetInfinite } from "./useGetInfinite";

type UseGetMusicsOptions = Omit<
    UseInfiniteQueryOptions<DeezerChartResponse, Error, InfiniteData<DeezerChartResponse, number>, readonly unknown[], number>,
    "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
>;

const dedupeById = (musics: MusicDezzerModel[]) => Array.from(new Map(musics.map((m) => [m.id, m])).values());

export function useGetMusics(opciones?: UseGetMusicsOptions) {
    const query = useGetInfinite<DeezerChartResponse>({
        key: "musics-chart",
        url: MusicsDeezerApi.chartUrl(),
        getPageLength: (lastPage) => lastPage.tracks.data.length,
        ...opciones,
    });

    return {
        ...query,
        data: dedupeById(query.data?.pages.flatMap((page) => page.tracks.data) ?? []),
    };
}
