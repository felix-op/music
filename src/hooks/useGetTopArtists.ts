import { ArtistDezzerModel, DeezerArtistListResponse } from "@models/artistDezzer";
import { ArtistsDeezerApi } from "@services";
import { InfiniteData, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useGetInfinite } from "./useGetInfinite";

type TPage = DeezerArtistListResponse;

type UseGetTopArtistsOptions = Omit<
    UseInfiniteQueryOptions<TPage, Error, InfiniteData<TPage, number>, readonly unknown[], number>,
    "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
>;

const dedupeById = (artists: ArtistDezzerModel[]) =>
    Array.from(new Map(artists.map((a) => [a.id, a])).values());

export function useGetTopArtists(opciones?: UseGetTopArtistsOptions) {
    const result = useGetInfinite<TPage>({
        key: `top-artists`,
        url: ArtistsDeezerApi.topArtistsUrl(),
        limit: 30, // Get more artists per page since it's a grid
        getPageLength: (lastPage) => lastPage.data?.length ?? 0,
        ...opciones,
    });

    return {
        ...result,
        data: dedupeById(result.data?.pages.flatMap((page) => page.data ?? []) ?? []),
    };
}
