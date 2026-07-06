import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { buildUrl, fetchJson, TContentType, TParams } from "./httpGet";

type UseGetOptions<TData> = {
  key: string;
  url: string;
  params?: TParams;
  conAuth?: boolean;
  token?: string;
  contentType?: TContentType;
} & Omit<UseQueryOptions<TData>, "queryKey" | "queryFn">;

export function useGet<TData = unknown>({
  key,
  url,
  params,
  conAuth,
  token,
  contentType,
  ...opciones
}: UseGetOptions<TData>) {
  return useQuery<TData>({
    queryKey: [key, params],
    queryFn: () => fetchJson<TData>(buildUrl(url, params), { contentType, conAuth, token }),
    ...opciones,
  });
}
