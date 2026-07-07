# `src/components/`

Componentes de UI reutilizables. Cada componente tiene su propio subdirectorio con el archivo principal y un archivo `estilos.ts`. Todos se exportan desde `index.ts`.

## Album

**`Album.tsx`** — Tarjeta de álbum. Muestra portada (ícono de disco), nombre del álbum y artista. Al presionar navega al detalle del álbum. El ancho es configurable via prop.

## AlbumPlaceholder

**`AlbumPlaceholder.tsx`** — Skeleton loader para álbumes. Anima la opacidad entre 0.4 y 0.8 en un ciclo de 2.4s para simular carga. Muestra barras de texto para título, artista y metadatos.

## AlbumDeezer

**`AlbumDeezer.tsx`** — Componente específico para renderizar álbumes usando los modelos de Deezer. Soporta portadas reales de la API (fallback automático al ícono de disco).

## ArtistDeezer

**`ArtistDeezer.tsx`** — Avatar circular para mostrar la imagen y nombre del artista de Deezer.
**`ArtistPlaceholder.tsx`** — Skeleton loader circular animado para estado de carga de artistas.

## AnimatedTabBar

**`AnimatedTabBar.tsx`** — Control segmentado / tab bar animado. Desliza una cápsula indicadora bajo la pestaña activa usando animación spring (tension 80, friction 10).

**`AnimatedTabContent.tsx`** — Componente complementario que renderiza el contenido correspondiente a la pestaña activa.

## ChipButton

**`ChipButton.tsx`** — Botón tipo chip/etiqueta presionable. Soporta estado `active` con feedback visual (opacidad 0.85, escala 0.98). Usa fuente bold cuando está activo.

## GenrePlaceholder

**`GenrePlaceholder.tsx`** — Skeleton loader para secciones de género. Muestra un encabezado pulsante de género seguido de una lista horizontal de placeholders hijos configurables. La cantidad de ítems es parametrizable.

## Header

**`Header.tsx`** — Wrapper sobre `Stack.Screen` de Expo Router. Configura el título del encabezado y su visibilidad.

## Navbar

**`Navbar.tsx`** — Barra de navegación inferior principal. Renderiza un `NavbarButton` por cada ruta principal (explore, lists, playlist, local, system). Detecta la ruta activa y tiene lógica especial para el modo playlist.

**`NavbarButton.tsx`** — Botón individual de la barra de navegación. Muestra ícono + etiqueta, y se resalta cuando la ruta actual coincide.

**`NavbarContainer.tsx`** — Contenedor de la barra de navegación (fondo, padding, área segura).

## SimpleLoading

**`SimpleLoading.tsx`** — Indicador de carga con `ActivityIndicator` y un mensaje personalizable. Mensaje por defecto: *"Conectando con el cosmos..."*

## Typography

**`Typography.tsx`** — Componente de texto genérico. Acepta una prop `tipo`: `"titulo"` (30px), `"cuerpo"` (20px) o `"default"` (16px). La mayoría de las pantallas define sus tamaños inline; este componente se usa poco.

## `index.ts`

Exporta todos los componentes anteriores desde un único punto de entrada.
