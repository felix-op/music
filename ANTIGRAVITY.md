# ANTIGRAVITY.md

Guía de reglas y convenciones para colaborar con Antigravity en este proyecto.

## Gestión de Dependencias

**No usar rangos de versión en `package.json`.**

Todas las dependencias deben tener versiones exactas (sin `^` ni `~`). Nunca agregar ni modificar una dependencia usando prefijos de rango. Si se instala un paquete nuevo, fijarlo a la versión exacta instalada.

Correcto: `"expo": "54.0.33"`
Incorrecto: `"expo": "~54.0.33"` o `"expo": "^54.0.33"`

## Convenciones de Código

**No usar `export default`.** Usar siempre `export` nombrado (named export).

> Excepción: Las pantallas (screens) bajo `app/` que requiera Expo Router sí usan `export default`, ya que el framework lo exige para el enrutamiento basado en archivos.

**Cada componente debe tener su archivo de estilos separado (`estilos.ts`).** No definir estilos inline ni en el mismo archivo del componente.

**Cada directorio de módulos (`components/`, `hooks/`, `services/`, etc.) debe tener un `index.ts`** que reexporte su contenido desde un único punto de entrada.

**No declarar componentes como arrow function (`const Foo = () => {}`).** Usar siempre `function` nombrada (`function Foo() {}`).

## Estructura de Archivos

- `src/models/` — Interfaces TypeScript del dominio y tipos de respuesta de API
- `src/services/apis/` — Servicios de API (mocks y Deezer real)
- `src/hooks/` — Custom hooks (useGet, useGetInfinite y derivados)
- `src/components/` — Componentes de UI reutilizables
- `src/screens/` — Pantallas de la app

## Mocks

Los archivos mock (`AlbumsApi`, `GenresApi`, `MusicsApi`) **no deben borrarse** hasta que se complete la migración completa a la API real de Deezer. Siempre agregar los endpoints reales en archivos nuevos (ej: `AlbumsDeezer.ts`) sin modificar los mocks.

## Nomenclatura

- Modelos locales (mock): `Album`, `Music`, `Artist`, `Genre`
- Modelos de Deezer API: `AlbumDezzerModel`, `MusicDezzerModel`, `AlbumDezzerArtist`, etc.
- Services de Deezer: `AlbumsDeezerApi`, `MusicsDeezerApi`
- Hooks de Deezer: `useGetAlbumsByGenre`, `useGetMusics`, `useGetSearchMusics`
