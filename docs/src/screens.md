# `src/screens/`

Pantallas de la aplicación. Cada subcarpeta corresponde a una sección de la navbar principal.

---

## `explore/` — Explorador de biblioteca

Pantallas para navegar el contenido musical del servidor (actualmente con datos mock).

**`AlbumsScreen.tsx`** — Pantalla principal de álbumes. Consume `GenresApi.getGenresWithAlbums()` y muestra los géneros como encabezados de sección, cada uno con una lista horizontal de tarjetas `Album` (ancho 140px). Durante la carga muestra 3 skeletons `GenrePlaceholder`.

**`ArtistsScreen.tsx`** — Pantalla de artistas. Usa datos hardcodeados (`MOCK_ARTISTS`). Muestra los artistas en una grilla de 3 columnas. Cada tarjeta tiene un avatar circular con el ícono `person`, el nombre del artista y la cantidad de álbumes. Incluye feedback de escala al presionar (0.96).

**`MusicsScreen.tsx`** — Pantalla de canciones. Usa datos hardcodeados (`MOCK_TRACKS`). Lista vertical de canciones; cada fila muestra thumbnail, título, artista, duración y botón de reproducción.

> **Estado actual:** `ArtistsScreen` y `MusicsScreen` aún no están conectadas a la API; usan datos mock directamente.

---

## `system/` — Configuración del sistema

Pantallas de personalización de la apariencia de la app.

**`ColorSelectorScreen.tsx`** — Selector de colores del tema. Presenta 6 categorías (background, surface, primary, secondary, text, textMuted), cada una con opciones de color predefinidas. Al seleccionar un color llama a `setThemeColor(key, color)` del `ThemeContext`.

**`FontSelectorScreen.tsx`** — Selector de tipografía. Muestra 4 opciones: Caveat, Poppins, SourceCodePro y Finlandica. Cada opción tiene el nombre de la fuente y una vista previa del texto. La fuente activa se indica con un punto de color secundario. Llama a `changeFont(key)` del `FontContext`.
