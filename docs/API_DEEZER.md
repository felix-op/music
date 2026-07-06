# API Deezer — Referencia Detallada

> Base URL: `https://api.deezer.com`
> Rate limit: 50 requests / 5 segundos
> No requiere token de autenticación

---

## Album — `/album/{id}`

| Campo                     | Descripción                                                     | Tipo      |
| ------------------------- | --------------------------------------------------------------- | --------- |
| `id`                      | ID del álbum en Deezer                                          | `int`     |
| `title`                   | Título del álbum                                                | `string`  |
| `upc`                     | UPC del álbum                                                   | `string`  |
| `link`                    | URL del álbum en Deezer                                         | `url`     |
| `share`                   | Link para compartir el álbum                                    | `url`     |
| `cover`                   | URL de la portada (acepta param `size`: small, medium, big, xl) | `url`     |
| `cover_small`             | URL de la portada en tamaño small                               | `url`     |
| `cover_medium`            | URL de la portada en tamaño medium                              | `url`     |
| `cover_big`               | URL de la portada en tamaño big                                 | `url`     |
| `cover_xl`                | URL de la portada en tamaño xl                                  | `url`     |
| `md5_image`               | Hash MD5 de la imagen                                           | `string`  |
| `genre_id`                | ID del primer género (-1 si no se encuentra)                    | `int`     |
| `genres`                  | Lista de objetos género                                         | `list`    |
| `label`                   | Nombre del sello discográfico                                   | `string`  |
| `provider`                | Nombre del proveedor                                            | `string`  |
| `nb_tracks`               | Cantidad de tracks                                              | `int`     |
| `duration`                | Duración total en segundos                                      | `int`     |
| `fans`                    | Cantidad de fans                                                | `int`     |
| `release_date`            | Fecha de lanzamiento                                            | `date`    |
| `record_type`             | Tipo de álbum (EP / ALBUM / etc.)                               | `string`  |
| `available`               | Si el álbum está disponible                                     | `boolean` |
| `alternative`             | Álbum alternativo si el actual no está disponible               | `object`  |
| `tracklist`               | Link a la tracklist                                             | `url`     |
| `explicit_lyrics`         | Si el álbum contiene letras explícitas                          | `boolean` |
| `explicit_content_lyrics` | Valor de contenido explícito en letras (0–7)                    | `int`     |
| `explicit_content_cover`  | Valor de contenido explícito en portada (0–7)                   | `int`     |
| `contributors`            | Lista de contribuidores                                         | `list`    |
| `fallback`                | Álbum de fallback con id y status                               | `object`  |
| `artist`                  | Objeto artista: id, name, picture, picture_small/medium/big/xl  | `object`  |
| `tracks`                  | Lista de tracks                                                 | `list`    |

### Tracks en álbum

| Campo             | Descripción                                         | Tipo      |
| ----------------- | --------------------------------------------------- | --------- |
| `id`              | ID del track                                        | `int`     |
| `readable`        | Si el track es reproducible para el usuario         | `boolean` |
| `title`           | Título completo                                     | `string`  |
| `title_short`     | Título corto                                        | `string`  |
| `title_version`   | Versión del track                                   | `string`  |
| `link`            | URL del track en Deezer                             | `url`     |
| `duration`        | Duración en segundos                                | `int`     |
| `rank`            | Ranking en Deezer                                   | `int`     |
| `explicit_lyrics` | Si tiene letras explícitas                          | `boolean` |
| `preview`         | URL del preview (primeros 30 segundos)              | `url`     |
| `artist`          | Objeto: id, name                                    | `object`  |
| `album`           | Objeto: id, title, cover, cover_small/medium/big/xl | `object`  |

---

## Artist — `/artist/{id}`

| Campo            | Descripción                                                  | Tipo      |
| ---------------- | ------------------------------------------------------------ | --------- |
| `id`             | ID del artista en Deezer                                     | `int`     |
| `name`           | Nombre del artista                                           | `string`  |
| `link`           | URL del artista en Deezer                                    | `url`     |
| `share`          | Link para compartir                                          | `url`     |
| `picture`        | URL de la foto (acepta param `size`: small, medium, big, xl) | `url`     |
| `picture_small`  | Foto en tamaño small                                         | `url`     |
| `picture_medium` | Foto en tamaño medium                                        | `url`     |
| `picture_big`    | Foto en tamaño big                                           | `url`     |
| `picture_xl`     | Foto en tamaño xl                                            | `url`     |
| `nb_album`       | Cantidad de álbumes                                          | `int`     |
| `nb_fan`         | Cantidad de fans                                             | `int`     |
| `radio`          | Si el artista tiene smartradio                               | `boolean` |
| `tracklist`      | Link al top de tracks del artista                            | `url`     |

---

## Chart — `/chart`

### Tracks

| Campo             | Descripción                                                         | Tipo      |
| ----------------- | ------------------------------------------------------------------- | --------- |
| `id`              | ID del track                                                        | `int`     |
| `title`           | Título completo                                                     | `string`  |
| `title_short`     | Título corto                                                        | `string`  |
| `title_version`   | Versión del track                                                   | `string`  |
| `link`            | URL del track en Deezer                                             | `url`     |
| `duration`        | Duración en segundos                                                | `int`     |
| `rank`            | Ranking en Deezer                                                   | `int`     |
| `explicit_lyrics` | Si tiene letras explícitas                                          | `boolean` |
| `preview`         | URL del preview (primeros 30 segundos)                              | `url`     |
| `position`        | Posición en los charts                                              | `int`     |
| `artist`          | Objeto: id, name, link, picture, picture_small/medium/big/xl, radio | `object`  |
| `album`           | Objeto: id, title, cover, cover_small/medium/big/xl                 | `object`  |

### Albums

| Campo             | Descripción                                                         | Tipo      |
| ----------------- | ------------------------------------------------------------------- | --------- |
| `id`              | ID del álbum                                                        | `int`     |
| `title`           | Título del álbum                                                    | `string`  |
| `link`            | URL del álbum en Deezer                                             | `url`     |
| `cover`           | URL de la portada                                                   | `url`     |
| `cover_small`     | Portada small                                                       | `url`     |
| `cover_medium`    | Portada medium                                                      | `url`     |
| `cover_big`       | Portada big                                                         | `url`     |
| `cover_xl`        | Portada xl                                                          | `url`     |
| `record_type`     | Tipo (EP / ALBUM / etc.)                                            | `string`  |
| `explicit_lyrics` | Si tiene letras explícitas                                          | `boolean` |
| `position`        | Posición en los charts                                              | `int`     |
| `artist`          | Objeto: id, name, link, picture, picture_small/medium/big/xl, radio | `object`  |

### Artists

| Campo            | Descripción            | Tipo      |
| ---------------- | ---------------------- | --------- |
| `id`             | ID del artista         | `int`     |
| `name`           | Nombre                 | `string`  |
| `link`           | URL en Deezer          | `url`     |
| `picture`        | URL de la foto         | `url`     |
| `picture_small`  | Foto small             | `url`     |
| `picture_medium` | Foto medium            | `url`     |
| `picture_big`    | Foto big               | `url`     |
| `picture_xl`     | Foto xl                | `url`     |
| `radio`          | Si tiene smartradio    | `boolean` |
| `position`       | Posición en los charts | `int`     |

### Playlists

| Campo            | Descripción            | Tipo      |
| ---------------- | ---------------------- | --------- |
| `id`             | ID de la playlist      | `int`     |
| `title`          | Título                 | `string`  |
| `public`         | Si es pública          | `boolean` |
| `link`           | URL en Deezer          | `url`     |
| `picture`        | URL de la portada      | `url`     |
| `picture_small`  | Portada small          | `url`     |
| `picture_medium` | Portada medium         | `url`     |
| `picture_big`    | Portada big            | `url`     |
| `picture_xl`     | Portada xl             | `url`     |
| `position`       | Posición en los charts | `int`     |
| `user`           | Objeto: id, name       | `object`  |

### Podcasts

| Campo            | Descripción            | Tipo      |
| ---------------- | ---------------------- | --------- |
| `id`             | ID del podcast         | `int`     |
| `title`          | Título                 | `string`  |
| `description`    | Descripción            | `string`  |
| `available`      | Si está disponible     | `boolean` |
| `fans`           | Cantidad de fans       | `int`     |
| `link`           | URL en Deezer          | `url`     |
| `share`          | Link para compartir    | `url`     |
| `picture`        | URL de la portada      | `url`     |
| `picture_small`  | Portada small          | `url`     |
| `picture_medium` | Portada medium         | `url`     |
| `picture_big`    | Portada big            | `url`     |
| `picture_xl`     | Portada xl             | `url`     |
| `position`       | Posición en los charts | `int`     |

---

## Editorial — `/editorial` · `/editorial/{id}`

| Campo            | Descripción            | Tipo     |
| ---------------- | ---------------------- | -------- |
| `id`             | ID editorial en Deezer | `int`    |
| `name`           | Nombre del editorial   | `string` |
| `picture`        | URL de la imagen       | `url`    |
| `picture_small`  | Imagen small           | `url`    |
| `picture_medium` | Imagen medium          | `url`    |
| `picture_big`    | Imagen big             | `url`    |
| `picture_xl`     | Imagen xl              | `url`    |

---

## Genre — `/genre/{id}`

| Campo            | Descripción                                                    | Tipo     |
| ---------------- | -------------------------------------------------------------- | -------- |
| `id`             | ID del género en Deezer                                        | `int`    |
| `name`           | Nombre del género                                              | `string` |
| `picture`        | URL de la imagen (acepta param `size`: small, medium, big, xl) | `url`    |
| `picture_small`  | Imagen small                                                   | `url`    |
| `picture_medium` | Imagen medium                                                  | `url`    |
| `picture_big`    | Imagen big                                                     | `url`    |
| `picture_xl`     | Imagen xl                                                      | `url`    |

---

## Infos — `/infos`

| Campo         | Descripción                                 | Tipo      |
| ------------- | ------------------------------------------- | --------- |
| `country_iso` | Código ISO del país actual                  | `string`  |
| `country`     | Nombre del país actual                      | `string`  |
| `open`        | Si Deezer está disponible en el país actual | `boolean` |
| `offers`      | Ofertas disponibles en el país actual       | `array`   |

---

## Options — `/options`

| Campo                | Descripción                                     | Tipo      |
| -------------------- | ----------------------------------------------- | --------- |
| `streaming`          | Si el usuario puede hacer streaming             | `boolean` |
| `streaming_duration` | Duración de streaming del usuario               | `int`     |
| `offline`            | Si puede escuchar en modo offline               | `boolean` |
| `hq`                 | Si la calidad HQ puede activarse                | `boolean` |
| `ads_display`        | Muestra ads                                     | `boolean` |
| `ads_audio`          | Activa ads de audio                             | `boolean` |
| `too_many_devices`   | Si el usuario alcanzó el límite de dispositivos | `boolean` |
| `can_subscribe`      | Si puede suscribirse al servicio                | `boolean` |
| `radio_skips`        | Límite de skips en radio (0 = sin límite)       | `int`     |
| `lossless`           | Si el lossless está disponible                  | `boolean` |
| `preview`            | Si permite mostrar preview de tracks            | `boolean` |
| `radio`              | Si permite streaming de radio                   | `boolean` |

---

## Playlist — `/playlist/{id}`

| Campo                | Descripción                             | Tipo      |
| -------------------- | --------------------------------------- | --------- |
| `id`                 | ID de la playlist en Deezer             | `int`     |
| `title`              | Título                                  | `string`  |
| `description`        | Descripción                             | `string`  |
| `duration`           | Duración total en segundos              | `int`     |
| `public`             | Si es pública                           | `boolean` |
| `is_loved_track`     | Si es la playlist de tracks favoritos   | `boolean` |
| `collaborative`      | Si es colaborativa                      | `boolean` |
| `nb_tracks`          | Cantidad de tracks                      | `int`     |
| `unseen_track_count` | Tracks no vistos                        | `int`     |
| `fans`               | Cantidad de fans                        | `int`     |
| `link`               | URL en Deezer                           | `url`     |
| `share`              | Link para compartir                     | `url`     |
| `picture`            | URL de la portada (acepta param `size`) | `url`     |
| `picture_small`      | Portada small                           | `url`     |
| `picture_medium`     | Portada medium                          | `url`     |
| `picture_big`        | Portada big                             | `url`     |
| `picture_xl`         | Portada xl                              | `url`     |
| `checksum`           | Checksum de la lista de tracks          | `string`  |
| `creator`            | Objeto: id, name                        | `object`  |
| `tracks`             | Lista de tracks                         | `list`    |

### Tracks en playlist

| Campo             | Descripción                                              | Tipo        |
| ----------------- | -------------------------------------------------------- | ----------- |
| `id`              | ID del track                                             | `int`       |
| `readable`        | Si es reproducible                                       | `boolean`   |
| `title`           | Título completo                                          | `string`    |
| `title_short`     | Título corto                                             | `string`    |
| `title_version`   | Versión                                                  | `string`    |
| `unseen`          | Estado no visto                                          | `boolean`   |
| `isrc`            | ISRC del track                                           | `string`    |
| `link`            | URL en Deezer                                            | `url`       |
| `duration`        | Duración en segundos                                     | `int`       |
| `rank`            | Ranking en Deezer                                        | `int`       |
| `explicit_lyrics` | Si tiene letras explícitas                               | `boolean`   |
| `preview`         | URL del preview (primeros 30 segundos)                   | `url`       |
| `time_add`        | Timestamp de cuando se agregó a la playlist              | `timestamp` |
| `artist`          | Objeto: id, name, link                                   | `object`    |
| `album`           | Objeto: id, title, upc, cover, cover_small/medium/big/xl | `object`    |

---

## Radio — `/radio`

| Campo            | Descripción                                                    | Tipo     |
| ---------------- | -------------------------------------------------------------- | -------- |
| `id`             | ID de la radio en Deezer                                       | `int`    |
| `title`          | Título de la radio                                             | `string` |
| `description`    | Descripción                                                    | `string` |
| `share`          | Link para compartir                                            | `url`    |
| `picture`        | URL de la imagen (acepta param `size`: small, medium, big, xl) | `url`    |
| `picture_small`  | Imagen small                                                   | `url`    |
| `picture_medium` | Imagen medium                                                  | `url`    |
| `picture_big`    | Imagen big                                                     | `url`    |
| `picture_xl`     | Imagen xl                                                      | `url`    |
| `tracklist`      | Link a la tracklist de la radio                                | `url`    |
| `md5_image`      | Hash MD5 de la imagen                                          | `string` |

---

## Search — `/search?q={query}`

### Parámetros opcionales

| Parámetro | Descripción                | Valores posibles                                                                                                                                           |
| --------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `strict`  | Desactiva el modo fuzzy    | `on`                                                                                                                                                       |
| `order`   | Ordenamiento de resultados | `RANKING`, `TRACK_ASC`, `TRACK_DESC`, `ARTIST_ASC`, `ARTIST_DESC`, `ALBUM_ASC`, `ALBUM_DESC`, `RATING_ASC`, `RATING_DESC`, `DURATION_ASC`, `DURATION_DESC` |

### Campos del resultado

| Campo             | Descripción                                                  | Tipo      |
| ----------------- | ------------------------------------------------------------ | --------- |
| `id`              | ID del track                                                 | `int`     |
| `readable`        | Si es reproducible                                           | `boolean` |
| `title`           | Título completo                                              | `string`  |
| `title_short`     | Título corto                                                 | `string`  |
| `title_version`   | Versión                                                      | `string`  |
| `isrc`            | ISRC del track                                               | `string`  |
| `link`            | URL en Deezer                                                | `url`     |
| `duration`        | Duración en segundos                                         | `int`     |
| `rank`            | Ranking en Deezer                                            | `int`     |
| `explicit_lyrics` | Si tiene letras explícitas                                   | `boolean` |
| `preview`         | URL del preview (primeros 30 segundos)                       | `url`     |
| `artist`          | Objeto: id, name, link, picture, picture_small/medium/big/xl | `object`  |
| `album`           | Objeto: id, title, cover, cover_small/medium/big/xl          | `object`  |

### Búsqueda avanzada

| Filtro    | Descripción                 | Tipo     | Ejemplo                     |
| --------- | --------------------------- | -------- | --------------------------- |
| `artist`  | Nombre del artista          | `string` | `q=artist:"aloe blacc"`     |
| `album`   | Título del álbum            | `string` | `q=album:"good things"`     |
| `track`   | Título del track            | `string` | `q=track:"i need a dollar"` |
| `label`   | Nombre del sello            | `string` | `q=label:"because music"`   |
| `dur_min` | Duración mínima en segundos | `int`    | `q=dur_min:300`             |
| `dur_max` | Duración máxima en segundos | `int`    | `q=dur_max:500`             |
| `bpm_min` | BPM mínimo                  | `int`    | `q=bpm_min:120`             |
| `bpm_max` | BPM máximo                  | `int`    | `q=bpm_max:200`             |

---

## Track — `/track/{id}`

| Campo                     | Descripción                                                                                                   | Tipo      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------- | --------- |
| `id`                      | ID del track en Deezer                                                                                        | `int`     |
| `readable`                | Si es reproducible para el usuario                                                                            | `boolean` |
| `title`                   | Título completo                                                                                               | `string`  |
| `title_short`             | Título corto                                                                                                  | `string`  |
| `title_version`           | Versión                                                                                                       | `string`  |
| `unseen`                  | Estado no visto                                                                                               | `boolean` |
| `isrc`                    | ISRC del track                                                                                                | `string`  |
| `link`                    | URL en Deezer                                                                                                 | `url`     |
| `share`                   | Link para compartir                                                                                           | `url`     |
| `duration`                | Duración en segundos                                                                                          | `int`     |
| `track_position`          | Posición en el álbum                                                                                          | `int`     |
| `disk_number`             | Número de disco del álbum                                                                                     | `int`     |
| `rank`                    | Ranking en Deezer                                                                                             | `int`     |
| `release_date`            | Fecha de lanzamiento                                                                                          | `date`    |
| `explicit_lyrics`         | Si tiene letras explícitas                                                                                    | `boolean` |
| `explicit_content_lyrics` | Valor explícito en letras (0–6)                                                                               | `int`     |
| `explicit_content_cover`  | Valor explícito en portada (0–6)                                                                              | `int`     |
| `preview`                 | URL del preview (primeros 30 segundos)                                                                        | `url`     |
| `bpm`                     | Beats por minuto                                                                                              | `float`   |
| `gain`                    | Intensidad de la señal                                                                                        | `float`   |
| `available_countries`     | Países donde está disponible                                                                                  | `list`    |
| `alternative`             | Track alternativo si el actual no es legible                                                                  | `track`   |
| `contributors`            | Lista de contribuidores                                                                                       | `list`    |
| `md5_image`               | Hash MD5 de la imagen                                                                                         | `string`  |
| `track_token`             | Token para el media service                                                                                   | `string`  |
| `artist`                  | Objeto: id, name, link, share, picture, picture_small/medium/big/xl, nb_album, nb_fan, radio, tracklist, role | `object`  |
| `album`                   | Objeto: id, title, link, cover, cover_small/medium/big/xl, release_date                                       | `object`  |

---

## User — `/user/me`

| Campo                               | Descripción                                                                            | Tipo      |
| ----------------------------------- | -------------------------------------------------------------------------------------- | --------- |
| `id`                                | ID del usuario en Deezer                                                               | `int`     |
| `name`                              | Nickname                                                                               | `string`  |
| `lastname`                          | Apellido                                                                               | `string`  |
| `firstname`                         | Nombre                                                                                 | `string`  |
| `email`                             | Email                                                                                  | `string`  |
| `status`                            | Estado del usuario                                                                     | `int`     |
| `birthday`                          | Fecha de nacimiento                                                                    | `date`    |
| `inscription_date`                  | Fecha de registro                                                                      | `date`    |
| `gender`                            | Género: F o M                                                                          | `string`  |
| `link`                              | URL del perfil en Deezer                                                               | `url`     |
| `picture`                           | URL de la foto de perfil (acepta param `size`)                                         | `url`     |
| `picture_small`                     | Foto small                                                                             | `url`     |
| `picture_medium`                    | Foto medium                                                                            | `url`     |
| `picture_big`                       | Foto big                                                                               | `url`     |
| `picture_xl`                        | Foto xl                                                                                | `url`     |
| `country`                           | País del usuario                                                                       | `string`  |
| `lang`                              | Idioma del usuario                                                                     | `string`  |
| `is_kid`                            | Si el usuario es menor de edad                                                         | `boolean` |
| `explicit_content_level`            | Nivel de contenido explícito según país                                                | `string`  |
| `explicit_content_levels_available` | Niveles disponibles: `explicit_display`, `explicit_no_recommendation`, `explicit_hide` | `array`   |
| `tracklist`                         | Link al flow del usuario                                                               | `url`     |
