import { MusicDezzerModel } from "@models/musicDezzer";
import { DeezerListResponse, MusicsDeezerApi } from "@services";
import { InfiniteData, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useGetInfinite } from "./useGetInfinite";

type TPage = DeezerListResponse<MusicDezzerModel>;

type UseGetSearchMusicsOptions = Omit<
    UseInfiniteQueryOptions<TPage, Error, InfiniteData<TPage, number>, readonly unknown[], number>,
    "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
>;

const dedupeById = (musics: MusicDezzerModel[]) => Array.from(new Map(musics.map((m) => [m.id, m])).values());

export function useGetSearchMusics(query: string, opciones?: UseGetSearchMusicsOptions) {
    const result = useGetInfinite<TPage>({
        key: "musics-search",
        url: MusicsDeezerApi.searchUrl(),
        params: { q: query },
        enabled: query.trim().length > 0,
        getPageLength: (lastPage) => lastPage.data.length,
        ...opciones,
    });

    return {
        ...result,
        data: dedupeById(result.data?.pages.flatMap((page) => page.data) ?? []),
    };
}
