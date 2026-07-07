# `src/hooks/`

Custom hooks de React para lógica reutilizable entre pantallas.

---

## `usePlayList.ts`

Hook del reproductor. Detecta si la ruta actual está bajo `/playlist` para activar el modo reproductor en la navbar.

**Retorna:**
- `isPlayListMode` — `boolean`. `true` cuando la ruta activa es `/playlist` o alguna de sus hijas.
- `botones` — Array de 5 controles de reproducción: anterior, retroceder, play/pausa, adelantar, siguiente. Cada botón tiene `id`, `icon` y `onPress`.
- `isPlaying` — `boolean`. Estado de reproducción (toggle).

> **Estado actual:** Los handlers de los botones son mock (loguean a consola). La integración con audio real está pendiente.

---

## `useGet.ts`

Hook genérico sobre `useQuery` de TanStack Query. Abstrae el `fetch` y el `response.json()` para peticiones GET.

**Parámetros:**
- `key` — `string`. Se usa como parte de la `queryKey`.
- `url` — `string`. URL del recurso a consultar.
- `params?` — `Record<string, string | number | boolean | undefined>`. Se serializan como query string.
- `conAuth?` — `boolean`. Si es `true` (y hay `token`), agrega el header `Authorization: Bearer <token>`.
- `token?` — `string`. Token a usar cuando `conAuth` está activo.
- `contentType?` — `TContentType`. Setea el header `Content-Type`. Sin uso actual en el proyecto.
- `...opciones` — Resto de opciones de `UseQueryOptions` (sin `queryKey` ni `queryFn`), permite sobreescribir o agregar configuración de la query.

**Retorna:** el resultado de `useQuery` (`data`, `isLoading`, `error`, etc.), tipado por el genérico `TData`.

---

## `useGetInfinite.ts`

Hook genérico sobre `useInfiniteQuery` de TanStack Query para listas paginadas de Deezer.

**Parámetros:**
- `key` — `string`. Se usa como parte de la `queryKey`.
- `url` — `string` o función `(index) => string`. URL base.
- `limit` — `number`. Cantidad de elementos por página.
- `getPageLength` — `(lastPage: TData) => number`. Función para saber cuántos elementos devolvió la última página.

**Retorna:** el resultado de `useInfiniteQuery` (incluye `fetchNextPage`, `hasNextPage`, `isFetchingNextPage`).

---

## Hooks Específicos de Deezer

**`useGetAlbumById.ts`** — Trae los detalles completos de un álbum (incluye lista de canciones) usando `useGet`.
**`useGetAlbumsByGenre.ts`** — Listado infinito de álbumes pertenecientes a un género específico.
**`useGetTopArtists.ts`** — Listado infinito de los top artistas globales.
**`useGetAlbumsByArtist.ts`** — Listado infinito de álbumes lanzados por un artista específico.
