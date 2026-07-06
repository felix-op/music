# Plan: Listado genérico de músicas

## Contexto

La pestaña "Only music" en explore usa `MusicsScreen` con datos hardcodeados y un estilo de card (borde, fondo). Se necesita una pantalla genérica `MusicScreen` que:
- Acepte filtros opcionales (genre, album, artist) como props para reutilizarse en múltiples contextos
- Tenga un TextInput de búsqueda para filtrar client-side
- Use un diseño diferente al actual: sin card, icono redondo, botón play superpuesto al icono
- Navegue al detalle de una música (`app/explore/music/[id].tsx`)

---

## Archivos a crear

```
src/components/TextInput/
    TextInput.tsx
    estilos.ts

src/components/MusicListItem/
    MusicListItem.tsx
    estilos.ts

src/components/MusicPlaceholder/
    MusicPlaceholder.tsx
    estilos.ts

src/screens/explore/
    MusicScreen.tsx          ← reemplaza MusicsScreen.tsx

app/explore/music/
    [id].tsx
```

## Archivos a modificar

```
src/services/apis/Musics.ts       ← agregar getFiltered()
src/components/index.ts           ← exportar nuevos componentes
app/explore/index.tsx             ← usar MusicScreen en lugar de MusicsScreen
```

---

## 1. MusicsApi — nuevo método `getFiltered`

**Archivo:** `src/services/apis/Musics.ts`

```ts
getFiltered: (filters?: {
    genreId?: number;
    albumId?: number;
    artistId?: number;
}): Promise<Music[]> => {
    let result = MOCK_MUSICS;
    if (filters?.genreId)  result = result.filter(m => m.genres.some(g => g.id === filters.genreId));
    if (filters?.albumId)  result = result.filter(m => m.album.id === filters.albumId);
    if (filters?.artistId) result = result.filter(m => m.artist.id === filters.artistId);
    return delay(result);
},
```

Si no se pasan filtros, devuelve toda la colección (comportamiento de `getAll`).

---

## 2. Componente `TextInput`

**Archivo:** `src/components/TextInput/TextInput.tsx`

Props:
```ts
type TProps = {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
};
```

Visual:
- `View` con `flexDirection: "row"`, fondo `theme.background.paper`, borde `theme.divider`, borderRadius 10
- Icono `Ionicons name="search"` color `theme.text.disabled` a la izquierda
- `TextInput` nativo de RN que ocupa el resto (`flex: 1`), texto `theme.text.primary`, placeholderTextColor `theme.text.disabled`
- Usa `useAppTheme()` y `useAppFont()` para colores y fuente

---

## 3. Componente `MusicListItem`

**Archivo:** `src/components/MusicListItem/MusicListItem.tsx`

Props:
```ts
type TProps = {
    music: Music;
    onPress: () => void;
};
```

Estructura visual (sin card — fondo transparente, separador inferior sutil):
```
Row (Pressable):
  ┌── Icono relativo (52×52) ────────────────────────────────┐
  │  ╭──────╮                                                │
  │  │  ♪   │  ← círculo coloreado (music.album.coverColor  │
  │  │    ▷ │    o color derivado del id)                    │
  │  ╰──────╯  ← Ionicons "play" sin borde, esquina inf-der  │
  └──────────────────────────────────────────────────────────┘
  ┌── infoCol (flex: 1, marginLeft: 12) ─────────────────────┐
  │  name (bold, text.primary)                               │
  │  artist.name · duration (regular, text.secondary)        │
  └──────────────────────────────────────────────────────────┘
```

Detalles del play overlay:
- `position: "absolute"` dentro del icono relativo, alineado `bottom: 4, right: 4`
- `Ionicons name="play" size={14}` con color `theme.text.primary` (no "play-circle")
- Sin borde ni fondo propio — directamente el triángulo sobre el icono

Color del icono: usar `music.album.coverColor ?? theme.primary.main` — el modelo `Album` ya tiene `coverColor?` en todos los ítems de mockData, así que en la práctica siempre habrá color disponible.

Separador: `borderBottomWidth: StyleSheet.hairlineWidth`, color `theme.divider`.

El `onPress` es pasado desde fuera (MusicScreen navega a `/explore/music/[id]`).

---

## 4. Componente `MusicPlaceholder`

**Archivo:** `src/components/MusicPlaceholder/MusicPlaceholder.tsx`

Esqueleto animado que imita la forma de `MusicListItem`:
- Círculo (`borderRadius: 26`) 52×52 — replica el icono redondo
- Línea larga (título) + línea corta (artista/duración) con fondo `theme.background.paper` + pulse animation
- Sin card, mismo layout que `MusicListItem`
- Reutiliza el patrón `Animated.loop` de `AlbumPlaceholder` (opacity 0.4 → 0.8)

---

## 5. Pantalla genérica `MusicScreen`

**Archivo:** `src/screens/explore/MusicScreen.tsx`

Props:
```ts
type TProps = {
    genreId?: number;
    albumId?: number;
    artistId?: number;
};
```

Comportamiento:
1. Al montar, llama `MusicsApi.getFiltered({ genreId, albumId, artistId })`
2. Guarda en estado `musics` + `loading`
3. Tiene estado `search: string` — filtra `musics` client-side sobre `name + artist.name` (case-insensitive)
4. **Loading**: muestra `FlatList` con 5 × `MusicPlaceholder`
5. **Con datos**: muestra `TextInput` encima de `FlatList` con `MusicListItem`
6. `onPress` de cada ítem: `router.push({ pathname: '/explore/music/[id]', params: { id, musicName: music.name } })`

```
View (flex: 1):
  TextInput (value=search, onChangeText=setSearch, placeholder="Buscar música...")
  FlatList (filteredMusics)
    renderItem → MusicListItem
```

**Reemplaza MusicsScreen**: en `app/explore/index.tsx` cambiar el import de `MusicsScreen` a `MusicScreen` en el tab de "Only music" (sin pasar filtros). El `MusicsScreen.tsx` original puede eliminarse ya que usaba datos hardcodeados independientes de `MOCK_MUSICS`.

**Nota sobre nombre TextInput**: el componente se llama `TextInput` como pidió el usuario. Internamente importa el nativo de RN como `RNTextInput` para evitar colisión de nombres.

---

## 6. Ruta `app/explore/music/[id].tsx`

Params: `id`, `musicName?`

Stack.Screen options:
- `headerShown: true`
- `title: musicName ?? "Música"`
- `animation: "slide_from_right"`
- `headerBackVisible: false`
- `headerLeft`: botón con `Ionicons "chevron-back"` → `router.back()` (no va siempre al listado, sólo hace pop)

Contenido inicial: placeholder con el nombre y duración (se puede expandir luego con datos reales via `MusicsApi.getById`).

---

## 7. Exportaciones

`src/components/index.ts` — agregar:
```ts
export { TextInput } from "./TextInput/TextInput";
export { MusicListItem } from "./MusicListItem/MusicListItem";
export { MusicPlaceholder } from "./MusicPlaceholder/MusicPlaceholder";
```

---

## Verificación

1. **Pestaña "Only music"** en explore: debe mostrar `TextInput` + lista sin card, íconos redondos, play superpuesto en icono izquierdo. El texto de búsqueda filtra en tiempo real.
2. **Tap en una música**: navega a `/explore/music/[id]` con animación slide from right, header muestra el nombre de la canción y tiene botón atrás.
3. **Botón atrás en detalle**: hace `router.back()` (vuelve al listado o a donde se vino).
4. **MusicScreen con filtros**: pasarle `genreId=1` y verificar que sólo muestra músicas de Rock; con `albumId` filtra por álbum.
5. **Placeholder**: durante la carga (1 segundo de delay) se ven los 5 esqueletos animados.
