# Architecture

> Flujo de datos, almacenamiento local y manejo del ciclo de vida de la reproducción.

## Estructura del Proyecto

```
music/
├── app/              # Rutas de Expo Router (file-based routing)
│   ├── _layout.tsx   # Layout raíz con Stack navigator
│   ├── index.tsx     # Pantalla principal
│   ├── explore/      # Explorador de contenido
│   │   ├── index.tsx                    # Tabs: Albums / Artists / Only music
│   │   └── albums/
│   │       ├── index.tsx                # (ruta vacía, reservada)
│   │       ├── [id].tsx                 # Detalle de un álbum
│   │       └── genre/
│   │           └── [genre].tsx          # Listado de álbumes por género
│   ├── lists/        # Listas de reproducción guardadas
│   ├── local/        # Música local
│   ├── playlist/     # Vista de playlist activa
│   └── system/       # Configuración y sistema
├── src/
│   ├── components/   # Componentes reutilizables (Album, Header, AnimatedTabBar, …)
│   ├── hooks/        # Custom hooks (ej. usePlayList)
│   ├── models/       # Interfaces TypeScript (Album, Artist, Genre, Music, Theme)
│   ├── screens/      # Pantallas montadas dentro de tabs/layouts
│   │   └── explore/  # AlbumsScreen, ArtistsScreen, MusicsScreen
│   ├── services/     # Capa de datos
│   │   ├── apis/     # Funciones de acceso a datos (mockData + funciones async)
│   │   ├── contexts/ # React Contexts (ThemeContext, FontContext)
│   │   └── providers/# React Providers (ThemeProvider, FontProvider)
│   └── styles/       # Tokens de diseño (defaultTheme)
└── scripts/          # Utilidades de desarrollo
```

## Flujo de Datos

```
mockData.ts ──► Api*.ts (delay simulado) ──► Screen/Component (useState + useEffect)
```

- Las funciones en `src/services/apis/` simulan llamadas HTTP con un `delay` de 1 segundo.
- Los componentes-pantalla llaman a estas funciones en `useEffect`, muestran placeholders animados durante la carga, y renderizan el contenido al resolverse la promesa.
- No hay caché ni store global por ahora: cada montaje refetch.

### APIs disponibles

| Módulo       | Métodos principales                                                     |
|--------------|-------------------------------------------------------------------------|
| `AlbumsApi`  | `getAll()`, `getById(id)`, `getByGenreId(genreId)`                     |
| `GenresApi`  | `getGenres()`, `getGenresWithAlbums()`, `getGenresWithMusics()`, `getGenresWithArtists()` |
| `ArtistsApi` | *(pendiente)*                                                            |
| `MusicsApi`  | *(pendiente)*                                                            |

## Sistema de Temas

- **ThemeProvider** envuelve la app desde `_layout.tsx`.
- El hook `useAppTheme()` expone `theme: ThemePalette` en cualquier componente.
- El tema `default` es oscuro (fondo `#09070F`, primario `#8B5CF6` morado).
- La interfaz `ThemePalette` sigue la estructura de Material Design (primary, secondary, error, warning, info, success, text, background, action, divider, grey).

## Patrones de Animación

| Patrón            | Dónde se usa                                | Implementación                               |
|-------------------|---------------------------------------------|----------------------------------------------|
| Fade + slide-up   | Grilla de álbumes por género (`[genre].tsx`)| `Animated.timing` con stagger por índice     |
| Pulse skeleton    | `AlbumPlaceholder`, `GenrePlaceholder`      | `Animated.loop` con secuencia opacity 0.4→0.8|
| Slide tab         | `AnimatedTabBar`                            | Spring animation sobre `translateX`          |
| Fade tab content  | `AnimatedTabContent`                        | `Animated.timing` opacity + translateX       |
| Scale press       | `Album`, `ArtistsScreen`, botones           | `transform: [{ scale }]` en estado `pressed` |

## Navegación

Expo Router con Stack. Patrones de push:

```ts
// Álbum particular
router.push({ pathname: '/explore/albums/[id]', params: { id, nombre } });

// Listado de álbumes de un género
router.push({ pathname: '/explore/albums/genre/[genre]', params: { genre: id, genreName } });
```

## Flujo de la pantalla Explore

```
ExplorePage (app/explore/index.tsx)
  └── AnimatedTabBar  (selección de tab)
  └── AnimatedTabContent
        ├── AlbumsScreen   → lista horizontal por género → SeeMoreCard → GenreAlbumsPage
        ├── ArtistsScreen  → grilla 3 columnas
        └── MusicsScreen   → lista vertical de tracks
```

## Almacenamiento Local

*(Pendiente de especificación)*

## Ciclo de Vida de la Reproducción

*(Pendiente de especificación)*
