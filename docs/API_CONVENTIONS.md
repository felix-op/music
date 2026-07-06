# API Conventions

> Contratos y esquemas de datos esperados del servidor personal de música.

## Autenticación

_(Pendiente de especificación)_

## Endpoints de Deezer

> Base URL: `https://api.deezer.com` · Rate limit: 50 requests / 5 segundos
> Ver detalle completo de campos en [API_DEEZER.md](API_DEEZER.md)

| Recurso | Endpoint | Descripción |
|---------|----------|-------------|
| Album | `/album/{id}` | Datos del álbum, tracks y artista |
| Artist | `/artist/{id}` | Datos del artista |
| Chart | `/chart` | Charts globales: tracks, álbumes, artistas, playlists y podcasts |
| Editorial | `/editorial` · `/editorial/{id}` | Editoriales de Deezer |
| Genre | `/genre/{id}` | Géneros musicales |
| Infos | `/infos` | Info general del país del usuario |
| Options | `/options` | Opciones de cuenta del usuario autenticado |
| Playlist | `/playlist/{id}` | Datos de la playlist y sus tracks |
| Radio | `/radio` | Radios disponibles |
| Search | `/search?q={query}` | Búsqueda de tracks (soporta filtros avanzados) |
| Track | `/track/{id}` | Datos completos del track |
| User | `/user/me` | Datos del usuario autenticado |

## Esquemas de Datos

_(Pendiente de especificación)_
