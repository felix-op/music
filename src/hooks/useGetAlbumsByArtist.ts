import { AlbumDezzerModel, DeezerAlbumListResponse } from "@models/albumDezzer";
import { ArtistsDeezerApi } from "@services";
import { InfiniteData, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useGetInfinite } from "./useGetInfinite";

type TPage = DeezerAlbumListResponse;

type UseGetAlbumsByArtistOptions = Omit<
    UseInfiniteQueryOptions<TPage, Error, InfiniteData<TPage, number>, readonly unknown[], number>,
    "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
>;

const dedupeById = (albums: AlbumDezzerModel[]) =>
    Array.from(new Map(albums.map((a) => [a.id, a])).values());

export function useGetAlbumsByArtist(artistId: number, opciones?: UseGetAlbumsByArtistOptions) {
    const result = useGetInfinite<TPage>({
        key: `albums-by-artist-${artistId}`,
        url: ArtistsDeezerApi.albumsByArtistUrl(artistId),
        limit: 10,
        getPageLength: (lastPage) => lastPage.data?.length ?? 0,
        ...opciones,
    });

    return {
        ...result,
        data: dedupeById(result.data?.pages.flatMap((page) => page.data ?? []) ?? []),
    };
}
