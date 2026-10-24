# Instrucciones para agentes de código

Este archivo es la fuente común de instrucciones para Codex, OpenCode y otros
agentes compatibles con `AGENTS.md`.

## Proyecto

Sitio estático de portfolio y currículum personal. El frontend usa HTML, CSS y
JavaScript sin framework ni proceso de compilación. Nginx sirve el contenido de
`frontend/` y Docker Compose publica el servicio en el puerto `8080`.

```text
frontend/
  index.html                 Página principal
  privacy.html               Política de privacidad
  data/data.json             Contenido dinámico del currículum
  assets/css/                Estilos, agrupados por sección
  assets/js/                 Interactividad y renderizado de datos
  assets/images/             Imágenes e iconos
docker-compose.yml           Servicio Nginx
nginx.conf                   Configuración del sitio en Nginx
```

## Convenciones de trabajo

- Mantén el sitio estático y sin dependencias de compilación; no introduzcas un
  backend o framework salvo que la tarea lo requiera expresamente.
- Para cambiar datos del currículum, edita `frontend/data/data.json`. El
  renderizado de esos datos está en `frontend/assets/js/scripts.js` y usa
  elementos con identificadores terminados en `-js`.
- Los estilos se importan desde `frontend/assets/css/all.css`; conserva la
  organización por sección existente.
- Los componentes reutilizables del sitio se definen en
  `frontend/assets/js/components.js`.
- Mantén `frontend/index.html` y `frontend/privacy.html` en inglés, de acuerdo
  con el contenido actual del sitio. La documentación para colaboradores puede
  escribirse en español.
- No añadas secretos, credenciales ni datos personales nuevos.
- Evita cambios ajenos al objetivo solicitado y respeta modificaciones que ya
  existan en el árbol de trabajo.

## Ejecución local

Requiere Docker con Compose:

```sh
docker compose up -d
```

Abre `http://localhost:8080`. Para detener el servicio:

```sh
docker compose down
```

No hay scripts de build o test configurados en este repositorio. Al modificar
el frontend, comprueba el cambio en el navegador; para cambios solo de
documentación, revisa las instrucciones y los enlaces afectados.

## Contacto

La página ofrece enlaces a correo electrónico, LinkedIn y GitHub. No hay
formulario de contacto ni integración con una API externa.
