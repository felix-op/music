import { DeezerChartResponse, MusicsDeezerApi } from "@services";
import { UseQueryOptions } from "@tanstack/react-query";
import { useGet } from "./useGet";

type UseGetMusicsOptions = Omit<UseQueryOptions<DeezerChartResponse>, "queryKey" | "queryFn">;

export function useGetMusics(opciones?: UseGetMusicsOptions) {
    const query = useGet<DeezerChartResponse>({
        key: "musics-chart",
        url: MusicsDeezerApi.chartUrl(),
        ...opciones,
    });

    return {
        ...query,
        data: query.data?.tracks.data,
    };
}
