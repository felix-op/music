import { InfiniteData, useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { buildUrl, fetchJson, TContentType, TParams } from "./httpGet";

type UseGetInfiniteOptions<TData> = {
    key: string;
    url: string;
    params?: TParams;
    limit?: number;
    conAuth?: boolean;
    token?: string;
    contentType?: TContentType;
    getPageLength: (lastPage: TData) => number;
} & Omit<
    UseInfiniteQueryOptions<TData, Error, InfiniteData<TData, number>, readonly unknown[], number>,
    "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
>;

const DEFAULT_LIMIT = 25;

export function useGetInfinite<TData = unknown>({
    key,
    url,
    params,
    limit = DEFAULT_LIMIT,
    conAuth,
    token,
    contentType,
    getPageLength,
    ...opciones
}: UseGetInfiniteOptions<TData>) {
    return useInfiniteQuery<TData, Error, InfiniteData<TData, number>, readonly unknown[], number>({
        queryKey: [key, params],
        initialPageParam: 0,
        queryFn: ({ pageParam }) =>
            fetchJson<TData>(buildUrl(url, { ...params, index: pageParam, limit }), { contentType, conAuth, token }),
        getNextPageParam: (lastPage, _pages, lastPageParam) =>
            getPageLength(lastPage) === limit ? lastPageParam + limit : undefined,
        ...opciones,
    });
}
