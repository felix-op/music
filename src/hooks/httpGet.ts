export type TContentType =
    | "application/json"
    | "application/xml"
    | "text/plain"
    | "text/html"
    | "multipart/form-data"
    | "application/x-www-form-urlencoded";

export type TParams = Record<string, string | number | boolean | undefined>;

export const buildUrl = (url: string, params?: TParams) => {
    if (!params) return url;

    const query = new URLSearchParams(
        Object.entries(params)
            .filter(([, value]) => value !== undefined)
            .map(([key, value]) => [key, String(value)])
    ).toString();

    return query ? `${url}?${query}` : url;
};

type FetchJsonOptions = {
    contentType?: TContentType;
    conAuth?: boolean;
    token?: string;
};

export const fetchJson = async <TData>(url: string, { contentType, conAuth, token }: FetchJsonOptions): Promise<TData> => {
    const headers: Record<string, string> = {};

    if (contentType) {
        headers["Content-Type"] = contentType;
    }

    if (conAuth && token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.json() as Promise<TData>;
};
