# `src/styles/`

Constantes globales de estilo. Los temas dinámicos viven en `ThemeContext`/`ThemeProvider`; estos archivos definen los valores base.

---

## `defaultTheme.ts`

Objeto de tema por defecto. Define la paleta completa de colores de la app:
- `background` — fondo principal de pantallas.
- `surface` — fondo de tarjetas y superficies elevadas.
- `primary` — color de acento principal (botones, indicadores activos).
- `secondary` — color de acento secundario.
- `text` / `textMuted` — colores de texto principal y atenuado.
- `divider` — color de separadores.

Es el valor inicial del `ThemeProvider`. Los colores individuales se pueden sobrescribir desde `ColorSelectorScreen` via `setThemeColor(key, color)`.

---

## `textos.ts`

Constantes tipográficas: tamaños de fuente, alturas de línea y pesos. En la práctica la mayoría de las pantallas define sus tamaños inline; este archivo está disponible para estandarizar cuando se necesite.
