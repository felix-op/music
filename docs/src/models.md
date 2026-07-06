# `src/models/`

Interfaces TypeScript que definen la forma de los datos del dominio. Se usan en toda la aplicación para tipar respuestas de API, props y estado.

---

## Entidades principales

**`music.ts`** — `Music`: representa una canción.
```ts
{ id, name, date, genres: Genre[], artist, album, duration }
```

**`album.ts`** — `Album`: representa un álbum.
```ts
{ id, name, artist: Artist, musics: Music[], coverColor?, year? }
```

**`artist.ts`** — `Artist`: representa un artista.
```ts
{ id, name, cantAlbums }
```

**`genre.ts`** — `Genre`: representa un género musical.
```ts
{ id, name }
```

---

## Tipos de UI

**`tabItem.ts`** — `TabItem`: elemento de una pestaña del componente `AnimatedTabBar`.
```ts
{ id, label }
```

**`theme.ts`** — Tipos del sistema de temas: `ColorScale`, `PaletteIntent`, `ThemePalette`, `TypeAction`, `TypeBackground`, `TypeText`. Usados por `ThemeContext` y `ThemeProvider`.

---

## `index.ts`

Exporta todos los tipos anteriores desde un único punto de entrada.
