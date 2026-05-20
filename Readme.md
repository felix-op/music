# Music Player (Nombre Provisional)

📱 Aplicación móvil diseñada para la descarga, organización local y reproducción de música desde un servidor personal.

## ⚙️ Descripción General

El proyecto consiste en un cliente móvil que permite a los usuarios autenticarse contra un servidor propio, explorar su biblioteca musical y descargar pistas para su consumo. Una vez en el dispositivo, la aplicación actúa como un reproductor completo con capacidades de organización mediante listas de reproducción y colas de reproducción dinámicas.

## 🛠️ Stack Tecnológico

*   **Framework:** React Native
*   **Gestión de Estado Asíncrono / Fetching:** TanStack Query
*   **UI:** Componentes nativos (sin librerías de componentes de terceros)

## 📋 Funcionalidades Principales

### 1. 📡 Explorador de Servidor
Módulo encargado de la conexión y extracción de metadatos del servidor remoto.
*   **Autenticación:** Requiere credenciales de acceso (usuario/contraseña).
*   **Vistas de Biblioteca:** Clasificación de los datos entrantes en tres categorías principales: Canciones, Artistas y Álbumes.
*   **Agrupación y Paginación:** Los elementos se agrupan por género musical. Se implementa un límite de visualización inicial con una opción de expansión ("Ver más") para consultar la colección completa de un género.
*   **Búsqueda Global:** Motor de búsqueda integrado para consultar cualquier elemento dentro de la base de datos del servidor.
*   *Nota:* El servidor debe cumplir con las convenciones de la API (documentación pendiente).

### 2. ▶️ Reproductor y Cola de Reproducción
Motor principal de reproducción de audio y gestión del estado actual.
*   **Controles de Transporte:** Reproducir, pausar, siguiente, anterior, adelantar y retroceder.
*   **Telemetría de Reproducción:** Barra de progreso interactiva y contadores de tiempo transcurrido / tiempo total.
*   **Gestión de Cola:** Visualización y control de la lista de canciones encoladas para la sesión actual.

### 3. 📁 Listas de Reproducción Guardadas
*   Creación, edición y persistencia de listas de reproducción locales. *(Detalles pendientes de especificación)*.

### 4. [Funcionalidad 4 - Pendiente]
*   *(Espacio reservado para la cuarta funcionalidad)*.

### 5. [Funcionalidad 5 - Pendiente]
*   *(Espacio reservado para la quinta funcionalidad)*.

## 🗂️ Arquitectura y Documentación Adicional

Debido a la extensión del proyecto, las especificaciones detalladas se dividirán en los siguientes documentos (por crear):
*   `docs/API_CONVENTIONS.md` - Contratos y esquemas de datos esperados del servidor.
*   `docs/ARCHITECTURE.md` - Flujo de datos, almacenamiento local y manejo del ciclo de vida de la reproducción.
