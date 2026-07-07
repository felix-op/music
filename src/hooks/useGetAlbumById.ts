import { AlbumDezzerModel } from "@models/albumDezzer";
import { AlbumsDeezerApi } from "@services";
import { UseQueryOptions } from "@tanstack/react-query";
import { useGet } from "./useGet";

type UseGetAlbumByIdOptions = Omit<
    UseQueryOptions<AlbumDezzerModel, Error>,
    "queryKey" | "queryFn"
>;

export function useGetAlbumById(id: number, opciones?: UseGetAlbumByIdOptions) {
    return useGet<AlbumDezzerModel>({
        key: `deezer-album-${id}`,
        url: AlbumsDeezerApi.albumByIdUrl(id),
        ...opciones,
    });
}
