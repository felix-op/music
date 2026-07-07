import { DeezerGenreListResponse } from "@models/albumDezzer";
import { AlbumsDeezerApi } from "@services";
import { UseQueryOptions } from "@tanstack/react-query";
import { useGet } from "./useGet";

type UseGetGenresOptions = Omit<
    UseQueryOptions<DeezerGenreListResponse, Error>,
    "queryKey" | "queryFn"
>;

export function useGetGenres(opciones?: UseGetGenresOptions) {
    return useGet<DeezerGenreListResponse>({
        key: "deezer-genres",
        url: AlbumsDeezerApi.genresUrl(),
        ...opciones,
    });
}
