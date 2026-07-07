import { AlbumDezzerModel, DeezerAlbumListResponse } from "@models/albumDezzer";
import { AlbumsDeezerApi } from "@services";
import { InfiniteData, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useGetInfinite } from "./useGetInfinite";

type TPage = DeezerAlbumListResponse;

type UseGetAlbumsByGenreOptions = Omit<
    UseInfiniteQueryOptions<TPage, Error, InfiniteData<TPage, number>, readonly unknown[], number>,
    "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
>;

const dedupeById = (albums: AlbumDezzerModel[]) =>
    Array.from(new Map(albums.map((a) => [a.id, a])).values());

export function useGetAlbumsByGenre(genreId: number, opciones?: UseGetAlbumsByGenreOptions) {
    const result = useGetInfinite<TPage>({
        key: `albums-by-genre-${genreId}`,
        url: AlbumsDeezerApi.albumsByGenreUrl(genreId),
        limit: 10,
        getPageLength: (lastPage) => lastPage.data?.length ?? 0,
        ...opciones,
    });

    return {
        ...result,
        data: dedupeById(result.data?.pages.flatMap((page) => page.data ?? []) ?? []),
    };
}
