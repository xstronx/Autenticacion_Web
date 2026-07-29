# Plan de mejoras visuales — TIME TRAVELS

Roadmap para mejorar la parte visual del frontend (`time-travels/client/`). Es un borrador para
revisar: agrega, quita o reordena lo que veas necesario antes de que se implemente nada.

## Diagnóstico actual

- Los estilos están repartidos en 3 enfoques distintos al mismo tiempo: CSS global
  (`index.css`, `principal.css`), `styled-components` (solo en `Phase4.jsx`/`Phase6.jsx`) y
  estilos inline (`ProductItem.jsx`, `CartItem.jsx`). No hay un criterio único.
- No existe una paleta de colores ni tipografía centralizada: se ven colores sueltos por
  archivo (gris de fondo, botones teal, rojo `rgb(248,8,8)`, azul `#1766DC` de
  styled-components, formularios en negro `#222`) sin relación entre sí.
- El header/nav (logo, menú hamburguesa, links) está copiado y pegado en cada página
  (`Phase1`, `Phase4`, `Phase7`, `Phase8`, …) en vez de ser un solo componente — cualquier
  cambio visual del menú hay que repetirlo manualmente en cada archivo.
- Las imágenes se referencian con rutas relativas (`src="./imagenes/vtd2.png"`), que se rompen
  en cualquier ruta que no sea la raíz `/` (por ejemplo en `/servicios` o `/compras` el navegador
  intenta cargar `imagenes/vtd2.png` relativo a esa ruta, no a la raíz del sitio).
- El JSX usa atributos HTML en vez de los de React (`class` en lugar de `className`, `for` en
  vez de `htmlFor`, `autofocus`/`maxlength` en vez de `autoFocus`/`maxLength`) — generan
  warnings en consola y son la causa más probable de que algunos estilos no se apliquen como se
  espera.
- Hay dos fuentes de Font Awesome cargadas a la vez: el script kit en `index.html` y un
  `@import` a `netdna.bootstrapcdn.com` (CDN antiguo, probablemente dado de baja) en
  `principal.css`.
- Los layouts (`.contenedor`, `.zonas`, `.tabla`, `.transporte`) usan CSS Grid con áreas y
  alturas en píxeles fijos, con reglas distintas repetidas por cada breakpoint — frágil y difícil
  de mantener a futuro.

## Fase 1 — Arreglos visuales urgentes (hecho)

- [x] Corregir las rutas de imágenes rotas fuera de `/` (`./imagenes/...` → `/imagenes/...`) en
  los 8 componentes que las usaban.
- [x] Reemplazar los atributos HTML por los de React en los 11 archivos afectados de
  `client/src` (`class`→`className`, `for`→`htmlFor`, `autofocus="true"`→`autoFocus`,
  `maxlength`→`maxLength`, `required="true"`→`required`).
- [x] Quitar el `@import` del Font Awesome viejo en `principal.css` y dejar solo el script kit de
  `index.html`.

## Fase 2 — Sistema de diseño (hecho)

- [x] Se eligió `styled-components` como único enfoque de estilos (ya estaba instalado y en uso
  parcial en `Phase4`/`Phase6`); se eliminaron `index.css` y `principal.css`.
- [x] Paleta y tipografía centralizadas en `client/src/styles/theme.js` (azul primario `#1766DC`,
  rojo de acento `#F80808`, fondo oscuro `#1A1A1F`, `Montserrat`) inyectada vía `ThemeProvider`
  en `index.jsx`; reset global movido a `client/src/styles/GlobalStyle.jsx`.
- [x] Estilos base reutilizables en `client/src/components/ui/`: `Button` (con variantes
  `primary`/`outline`, reemplaza `.button`, `.addHome`, `.login-submit` y el `Boton` ad-hoc de
  `Phase4`), `Card` (reemplaza los estilos inline de `ProductItem`/`CartItem`) y `AuthForm`
  (`FormCard`/`Input`/`ErrorText`, reemplaza `.login-form`/`.login-username`/`.login-password`).

## Fase 3 — Componentización (hecho)

- [x] `client/src/components/Navbar.jsx`: header/nav único (logo, título, menú hamburguesa vía
  checkbox) usado en `Phase1`, `Phase2`, `Phase3`, `Phase4`, `Phase7` y `Phase8`, con los links de
  cada página pasados por prop.
- [x] `client/src/components/Footer.jsx`: extraído del footer que solo vivía en `Phase4`.
- [x] `client/src/components/HeroBanner.jsx`: patrón de fondo a pantalla completa +
  texto de banner, usado en `Phase3`, `Phase9` y `Vacio` (antes duplicado como
  `.principal`/`.banner-text`).
- [x] `ProductItem` y `CartItem` unificados bajo `<Card>`/`<Button>`.

## Fase 4 — Formularios y feedback visual

- Rediseñar login (`Phase1`) y registro (`Phase8`): estados de error visibles (hoy `{err && err}`
  muestra el objeto de error crudo tal cual llega del backend), estado de carga en el botón,
  validación visual de campos.
- Agregar feedback visual al agregar/quitar del carrito (hoy no hay animación ni confirmación,
  solo el re-render de la lista).

## Fase 5 — Responsive y accesibilidad

- Revisar los layouts de grid con alturas fijas en píxeles (`.tabla`, `.contenedor`, `.zonas`)
  para que se adapten mejor en pantallas intermedias, no solo en los tres breakpoints actuales.
- Revisar contraste de color (texto blanco sobre fondo gris claro en varias secciones) y
  tamaños táctiles de botones en mobile.
- Agregar `alt` descriptivo donde falte y revisar el orden de foco/tab en los formularios.
