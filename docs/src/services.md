# `src/services/`

Capa de servicios: APIs, contextos de React, providers y configuración de rutas.

---

## `apis/` — Capa de datos

Módulos de acceso a datos. Actualmente todos operan sobre datos mock con un delay simulado de 1000ms para emular latencia de red.

**`mockData.ts`** — Hub central de datos de prueba. Define y exporta:
- `MOCK_GENRES` — 3 géneros: Rock, Electrónica, Clásica.
- `MOCK_ARTISTS` — 12 artistas.
- `MOCK_ALBUMS` — 12 álbumes (con relación a `musics` inicializada aquí).
- `MOCK_MUSICS` — 14 canciones.
- Tipos auxiliares: `GenreWithAlbums`, `GenreWithMusics`, `GenreWithArtists`.

**`Albums.ts`** — `AlbumsApi`: métodos `getById(id)` y `getAll()`. Retornan los datos mock con delay de 1000ms.

**`Artists.ts`** — `ArtistsApi`: mismo patrón que Albums pero para artistas.

**`Musics.ts`** — `MusicsApi`: mismo patrón que Albums pero para canciones.

**`Genres.ts`** — `GenresApi`: métodos de consulta de géneros con sus entidades relacionadas:
- `getGenres()` — lista de géneros.
- `getGenresWithAlbums()` — géneros con sus álbumes agrupados.
- `getGenresWithMusics()` — géneros con sus canciones agrupadas.
- `getGenresWithArtists()` — géneros con sus artistas agrupados.

---

## `contexts/` — Contextos de React

**`ThemeContext.ts`** — Define `ThemeContextType` (tema actual, nombre, `setTheme()`), el objeto `appThemes` con los temas disponibles y el hook `useAppTheme()`.

**`FontContext.ts`** — Define `FontContextType` (fuente seleccionada, variantes bold/regular, `changeFont()`, lista de opciones), el tipo `FontOption` y el hook `useAppFont()`. Las 4 fuentes disponibles son: Caveat, Poppins, SourceCodePro, Finlandica.

---

## `providers/` — Providers de contexto

**`ThemeProvider.tsx`** — Envuelve la app con `ThemeContext.Provider`. Gestiona el estado del tema y expone `setThemeColor(key, color)` para modificar colores individuales.

**`FontProvider.tsx`** — Envuelve la app con `FontContext.Provider`. Gestiona el estado de la fuente activa y la carga asíncrona de fuentes con Expo.

---

## `rutas.ts` — Configuración de rutas

Define la estructura de navegación completa de la app.

**Tipo `AppRoute`:** `{ id, label, href, icon?, navbar?, playlistNavbar?, children? }`

**Rutas principales (`ROUTES`):**

| Ruta | Label | Descripción |
|------|-------|-------------|
| `/explore` | Explorar | Biblioteca del servidor (álbumes, canciones, artistas) |
| `/lists` | Listas | Playlists guardadas localmente |
| `/playlist` | Playlist | Reproductor activo (cola, canción actual, ajustes) |
| `/local` | Local | Archivos descargados en el dispositivo |
| `/system` | Sistema | Configuración y personalización de la app |

**Rutas hijas de `/explore`:**
- `/explore/albums` → detalle por id y filtro por género
- `/explore/songs` → detalle por id y filtro por género
- `/explore/artists` → detalle por id y filtro por género

**Rutas hijas de `/playlist`:**
- `/playlist/queue` — Cola de reproducción
- `/playlist/current` — Canción en reproducción
- `/playlist/settings` — Ajustes del reproductor

**Helpers de `routesBuilder`:** `album(id)`, `song(id)`, `artist(id)`, `list(id)`, `albumGenre(genre)` — generan hrefs tipados para navegación programática.

---

## `index.ts`

Exporta todo lo anterior desde un único punto de entrada.
