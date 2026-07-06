# CLAUDE.md

Guía de reglas y convenciones para colaborar con Claude Code en este proyecto.

## Gestión de Dependencias

**No usar rangos de versión en `package.json`.**

Todas las dependencias deben tener versiones exactas (sin `^` ni `~`). Nunca agregar ni modificar una dependencia usando prefijos de rango. Si se instala un paquete nuevo, fijarlo a la versión exacta instalada.

Correcto: `"expo": "54.0.33"`
Incorrecto: `"expo": "~54.0.33"` o `"expo": "^54.0.33"`

## Convenciones de Código

**No usar `export default`.** Usar siempre `export` nombrado (named export).

**Cada componente debe tener su archivo de estilos separado (`estilos.ts`).** No definir estilos inline ni en el mismo archivo del componente.

**Cada directorio de módulos (`components/`, `hooks/`, `services/`, etc.) debe tener un `index.ts`** que reexporte su contenido desde un único punto de entrada.

**No declarar componentes como arrow function (`const Foo = () => {}`).** Usar siempre `function` nombrada (`function Foo() {}`).
