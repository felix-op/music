import { MusicDezzerModel } from "@models/musicDezzer";
import { MusicsDeezerApi } from "@services";
import { UseQueryOptions } from "@tanstack/react-query";
import { useGet } from "./useGet";

type UseGetMusicByIdOptions = Omit<UseQueryOptions<MusicDezzerModel>, "queryKey" | "queryFn">;

export function useGetMusicById(id: number, opciones?: UseGetMusicByIdOptions) {
    return useGet<MusicDezzerModel>({
        key: `music-${id}`,
        url: MusicsDeezerApi.byIdUrl(id),
        ...opciones,
    });
}
