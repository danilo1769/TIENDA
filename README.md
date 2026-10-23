# 🌾 Granero Daimaru

**Aplicación web para consultar precios de productos agrícolas de la Central Mayorista de Antioquia.**

Granero Daimaru es una aplicación web desarrollada para facilitar la consulta de precios de productos agrícolas y alimenticios. Permite visualizar los precios disponibles en la fuente de datos, buscar productos específicos, guardar favoritos y actualizar la información sin tener que consultar manualmente la hoja de cálculo original.

El proyecto busca ofrecer una interfaz sencilla, rápida y adaptable a dispositivos móviles, con mecanismos de almacenamiento local para conservar los últimos datos consultados cuando no es posible obtener una actualización.

## ✨ Características principales

- **Consulta de precios:** visualización de los precios registrados para los productos disponibles.
- **Búsqueda de productos:** filtrado dinámico por nombre.
- **Favoritos:** posibilidad de guardar productos de interés y consultarlos por separado.
- **Actualización de datos:** obtención de información mediante un Cloudflare Worker que proporciona el CSV de origen.
- **Actualización periódica:** consulta automática de datos durante el uso de la aplicación.
- **Caché local:** almacenamiento de los últimos productos obtenidos para facilitar su consulta ante fallos de conexión.
- **Interfaz adaptable:** diseño orientado a la consulta desde computadores y dispositivos móviles.
- **Preparación para PWA:** estructura con manifiesto y soporte opcional para Service Worker.

## 🛠️ Tecnologías utilizadas

- **HTML5:** estructura de la aplicación.
- **CSS3:** estilos y diseño de la interfaz.
- **JavaScript:** lógica de negocio, búsqueda, favoritos y actualización de datos.
- **Papa Parse:** procesamiento de archivos CSV.
- **Cloudflare Workers:** intermediario para obtener y entregar los datos de la fuente.
- **Google Sheets:** origen de los datos publicados.
- **LocalStorage:** persistencia de favoritos y caché de productos.
- **Git y GitHub:** control de versiones y gestión del código fuente.

## ⚙️ Funcionamiento

1. La aplicación consulta el endpoint del Cloudflare Worker.
2. El Worker obtiene o entrega la información CSV configurada como fuente de datos.
3. JavaScript procesa el CSV y extrae los nombres y precios de los productos.
4. Los productos se muestran en la interfaz y se ordenan alfabéticamente.
5. El usuario puede buscar productos, guardar favoritos y solicitar una actualización.
6. Los datos obtenidos se guardan localmente para intentar mantener la consulta disponible si falla una actualización posterior.

La disponibilidad de los datos depende de que la fuente de origen sea accesible y de que el formato del CSV se mantenga compatible con el procesamiento de la aplicación.

## 🚀 Ejecución local

### Requisitos

- Visual Studio Code u otro editor.
- La extensión Live Server, o un servidor web local equivalente.
- Acceso a Internet para consultar los datos y cargar Papa Parse desde CDN.

### Pasos

1. Clona el repositorio:

   ```bash
   git clone URL_DEL_REPOSITORIO
   ```

2. Abre la carpeta del proyecto en Visual Studio Code.

3. Verifica que `WORKER_URL` en `js/app.js` apunte al endpoint correcto de Cloudflare Workers.

4. Abre el archivo `index.html` con Live Server.

> Si el proyecto utiliza una carpeta `www` para su versión web o móvil, ejecuta el archivo `index.html` de la carpeta correspondiente.

## 📁 Estructura del proyecto

```text
granero-daimaru/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── assets/
│   └── logo.png
├── manifest.json
├── service-worker.js
└── README.md
```

La estructura puede variar según la versión utilizada para desarrollo web o empaquetado móvil.

## 🔐 Consideraciones técnicas

- La aplicación depende de la disponibilidad de la fuente de datos y del Worker.
- La caché local conserva datos previamente consultados, pero estos pueden quedar desactualizados.
- Los favoritos se almacenan en el navegador y no se sincronizan automáticamente entre dispositivos.
- El Worker debe configurarse para entregar el CSV correcto y permitir las solicitudes necesarias desde el origen de la aplicación.
- Las URL, identificadores y configuraciones de despliegue deben mantenerse actualizados cuando cambie la fuente de datos.

## 🎯 Objetivo del proyecto

Construir una herramienta práctica para consultar precios agrícolas de manera sencilla, combinando tecnologías web, consumo de datos externos, procesamiento de CSV y almacenamiento local.

El proyecto también sirve como experiencia práctica en desarrollo frontend, integración de servicios externos, manejo de errores y despliegue de aplicaciones web.

## 📌 Estado

Proyecto en desarrollo y mantenimiento.

## 👨‍💻 Autor

Desarrollado po **Danilo Marin**  bajo el nombre **Granero Daimaru**.
