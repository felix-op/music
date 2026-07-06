import { MusicDezzerModel } from "@models/musicDezzer";
import { DeezerListResponse, MusicsDeezerApi } from "@services";
import { UseQueryOptions } from "@tanstack/react-query";
import { useGet } from "./useGet";

type UseGetSearchMusicsOptions = Omit<
    UseQueryOptions<DeezerListResponse<MusicDezzerModel>>,
    "queryKey" | "queryFn"
>;

export function useGetSearchMusics(query: string, opciones?: UseGetSearchMusicsOptions) {
    const result = useGet<DeezerListResponse<MusicDezzerModel>>({
        key: "musics-search",
        url: MusicsDeezerApi.searchUrl(),
        params: { q: query },
        enabled: query.trim().length > 0,
        ...opciones,
    });

    return {
        ...result,
        data: result.data?.data,
    };
}
