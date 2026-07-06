import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type TContentType =
  | "application/json"
  | "application/xml"
  | "text/plain"
  | "text/html"
  | "multipart/form-data"
  | "application/x-www-form-urlencoded";

type TParams = Record<string, string | number | boolean | undefined>;

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
  const buildUrl = () => {
    if (!params) return url;

    const query = new URLSearchParams(
      Object.entries(params)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)]),
    ).toString();

    return query ? `${url}?${query}` : url;
  };

  return useQuery<TData>({
    queryKey: [key, params],
    queryFn: async () => {
      const headers: Record<string, string> = {};

      if (contentType) {
        headers["Content-Type"] = contentType;
      }

      if (conAuth && token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(buildUrl(), { headers });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return response.json() as Promise<TData>;
    },
    ...opciones,
  });
}
