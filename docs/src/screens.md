# `src/screens/`

Pantallas de la aplicación. Cada subcarpeta corresponde a una sección de la navbar principal.

---

## `explore/` — Explorador de biblioteca

Pantallas para navegar el contenido musical del servidor (actualmente con datos mock).

**`AlbumsScreen.tsx`** — Pantalla principal de álbumes. Consume `useGetGenres()` y muestra los géneros como encabezados de sección. Utiliza `GenreAlbumsRow` para presentar cada fila con un listado horizontal de álbumes de Deezer limitados a 10 elementos. Incluye botones "Ver más" para acceder al listado completo del género.

**`ArtistsScreen.tsx`** — Pantalla de artistas. Utiliza el hook `useGetTopArtists()` para consumir el chart global de artistas de Deezer y renderiza una grilla infinita (`numColumns={3}`). Cada tarjeta tiene un avatar circular (usando la portada real de Deezer) y redirige al listado de álbumes de ese artista.

**`MusicsScreen.tsx`** — Pantalla de canciones. Integra paginación infinita y barra de búsqueda sobre la API de Deezer. Muestra resultados de búsqueda en vivo o las canciones top agrupadas en una lista vertical con carátulas de Deezer integradas.

---

## `system/` — Configuración del sistema

Pantallas de personalización de la apariencia de la app.

**`ColorSelectorScreen.tsx`** — Selector de colores del tema. Presenta 6 categorías (background, surface, primary, secondary, text, textMuted), cada una con opciones de color predefinidas. Al seleccionar un color llama a `setThemeColor(key, color)` del `ThemeContext`.

**`FontSelectorScreen.tsx`** — Selector de tipografía. Muestra 4 opciones: Caveat, Poppins, SourceCodePro y Finlandica. Cada opción tiene el nombre de la fuente y una vista previa del texto. La fuente activa se indica con un punto de color secundario. Llama a `changeFont(key)` del `FontContext`.
