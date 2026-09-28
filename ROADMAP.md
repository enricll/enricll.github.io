# EnricLlonch.com: estado y hoja de ruta

## Objetivo

Mejorar la experiencia de lectura y exploración del blog, simplificar su mantenimiento y hacer que la portada y el blog se perciban como un único sitio. El diseño del blog actual es la base visual: se conservarán sus colores y estructura reconocibles mientras se modernizan y pulen sus componentes.

## Hecho

- Portada y blog integrados en el repositorio `enricll/enricll.github.io` y servidos desde GitHub Pages.
- `enricllonch.com/` es la portada y `enricllonch.com/blog/` es el archivo.
- Las entradas mantienen sus URLs en la raíz del dominio.
- DNS y dominio personalizado configurados para GitHub Pages.
- Estados de hover, foco de teclado y enlaces visitados añadidos.
- Metadatos de las entradas con fecha y tiempo estimado de lectura; iconos diferenciadores y textos en catalán.
- Portada integrada en la plantilla visual del blog, con navegación activa corregida.
- Botones y navegación móvil con contraste legible y hover lila, sin el salto a verde del tema anterior.
- Titular genérico de la portada retirado y pie simplificado para evitar repetir el nombre.
- El subdominio `blog.enricllonch.com` redirige a la portada del dominio principal. El proveedor no permite conservar la ruta con la configuración actual; se acepta que los enlaces antiguos profundos del subdominio acaben en la portada y no se prioriza cambiar de servicio para resolverlo.

## Implementado y visible en el sitio

- Archivo del blog agrupado por años, con recuento de entradas y filtros de año y temática.
- Búsqueda local en títulos, etiquetas y texto completo de los artículos. El índice se descarga solo al empezar a buscar.
- Categorías iniciales derivadas de las etiquetas existentes; conviene revisar las entradas que quedan en «Altres».
- Plantilla Jekyll aplicada por defecto a las entradas, con fecha, tiempo de lectura y enlace para volver al archivo.
- Ajustes de legibilidad en títulos, metadatos, párrafos, imágenes, pies de foto y citas.
- Revisado en el preview móvil: navegación anual, controles de filtro con alturas coherentes, búsqueda con resultados y estado sin resultados.
- Comprobado que el site público sirve el nuevo archivo y la búsqueda.

## Pendiente inmediato

- Se ha detectado una diferencia de agrupación entre el site público y el build local: ambos tienen 311 entradas, pero en el site público hay 4 en 2012 y 39 en 2013; localmente había 3 y 40. La entrada «2013» tiene fecha `2012-12-31T23:00:00+00:00`, por lo que cambia de año según la zona horaria del servidor.
- Añadido `timezone: Europe/Madrid` en `_config.yml`. El build local mantiene el agrupamiento 3/40 incluso al ejecutarse con `TZ=UTC`; falta subir este ajuste y comprobar el resultado en GitHub Pages.
- Revisar las entradas clasificadas en «Altres» y confirmar si las categorías actuales son suficientes.
## Próximas fases

### 1. Pulir el lenguaje visual compartido

- Revisar espaciado, jerarquía tipográfica y estados de enlaces en portada, archivo y entradas.
- Mantener la paleta y estructura del blog como base mientras se modernizan los detalles.
- Verificar la coherencia en móvil, escritorio y modo oscuro si se conserva.

### 2. Mejorar lectura y navegación de artículos

- Refinar ancho de lectura, títulos, imágenes, citas, listas y enlaces.
- Mejorar navegación anterior/siguiente y el regreso al archivo.
- Añadir enlaces a entradas relacionadas cuando las categorías estén definidas.
- Mantener fecha, tiempo estimado y etiquetas con presentación accesible.

### 3. Convertir el archivo en un espacio navegable

- Agrupar entradas por año.
- Definir categorías sencillas y consistentes, inicialmente música, cine, videojuegos y tecnología.
- Añadir filtros por año y categoría.
- Incorporar búsqueda local por título y contenido.
- Evaluar paginación según la facilidad de uso y el rendimiento.
- Conservar las URLs actuales de las entradas.

### 4. Completar accesibilidad y páginas de apoyo

- Revisar contraste, tamaños, teclado, nombres accesibles y áreas táctiles.
- Crear una página 404 con enlaces a Inicio, Blog y entradas destacadas.
- Revisar el diseño en móvil y las preferencias de movimiento reducido y contraste alto.

### 5. Modernizar y future-proofear los componentes internos

- Documentar cómo instalar dependencias, ejecutar Jekyll, crear entradas y publicar.
- Actualizar Ruby, Jekyll, Bundler, plugins y dependencias de forma gradual.
- Resolver la compilación limpia y la advertencia local sobre `jekyll-paginate`.
- Añadir comprobaciones automáticas en GitHub para detectar fallos antes de publicar.
- Mantener estables las URLs y comprobar los enlaces internos al cambiar componentes.

### 6. Mejorar rendimiento

- Revisar tamaño y formato de imágenes, y generar variantes adecuadas para cada pantalla.
- Aplicar carga diferida donde corresponda.
- Reducir CSS y JavaScript no utilizados y evitar dependencias externas innecesarias.
- Medir antes y después para centrarse en cambios que mejoren la carga real.
