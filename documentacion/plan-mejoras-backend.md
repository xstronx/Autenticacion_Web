# Plan de mejoras — Backend y reglas de negocio (TIME TRAVELS)

Roadmap para el backend (`time-travels/server/`) y las reglas de negocio del sistema de venta de
boletos. Es un borrador para revisar: agrega, quita o reordena lo que veas necesario antes de que
se implemente nada. Complementa (y detalla más a fondo la parte de backend/seguridad de)
[plan-de-accion.md](plan-de-accion.md).

## Diagnóstico actual

- **No existe una "compra" real.** El endpoint `/compras` (en `server/index.js`) en realidad hace
  CRUD sobre la tabla `viaje` (el catálogo de rutas/horarios), no sobre una reserva de un cliente.
  El carrito de `Phase7.jsx` usa datos mock hardcodeados en `compraReducer.js`
  (`compraIncialState.products`, 9 viajes fijos) y el botón "Agregar" solo modifica estado de
  React en el navegador — nunca llama al backend. Hoy es imposible comprar un boleto de verdad:
  nada se guarda, y el carrito desaparece al refrescar la página.
- **No se valida ni se descuenta disponibilidad.** La columna `asientosDispo_viaje` nunca se lee
  ni se actualiza en ningún endpoint — no hay ninguna regla que impida "vender" más boletos de los
  que hay asientos.
- **Bug de integridad de datos:** `DELETE /compras/:id` borra de la tabla `transporte`
  (`DELETE FROM transporte WHERE id_transporte = $1`), pero se llama desde `Mostar.jsx` pasando
  `viaje.cod_bl` (el código de un viaje, no un id de transporte). Borra la fila equivocada o
  falla silenciosamente si no coincide ningún `id_transporte`.
- **Sin autenticación en las rutas de escritura.** `POST/PUT/DELETE /compras` no tienen ningún
  middleware de verificación de sesión — cualquiera, con o sin cuenta, puede crear, editar o
  borrar viajes del catálogo.
- **Sin validación de inputs en ningún endpoint.** Registro, login y creación de viajes insertan
  `req.body` directo a la query. No se valida formato de cédula/email, campos vacíos, ni que
  `costo_bl`/`asientosDispo_viaje` sean números positivos.
- **Errores crudos de Postgres devueltos al cliente** (`res.status(500).json(err)` en cada
  `catch`) — expone detalles internos de la base de datos en vez de un mensaje controlado.
- **Endpoints vacíos o rotos:** `controllers/user.js#getUser` no hace nada; la ruta
  `router.get("/find:userId", getUser)` está mal formada (falta el `/` antes de `:userId`);
  `PATCH /compras/:id` declara la query pero nunca responde, así que la petición queda colgada
  hasta el timeout del cliente.
- **JWT sin expiración** (`jwt.sign({id: user.cedula}, process.env.JWT_SECRET)` sin `expiresIn`)
  y opciones de cookie inconsistentes entre `login` (`httpOnly` solamente) y `logout`
  (`secure:true, sameSite:"none"`) — si las opciones no coinciden, `clearCookie` puede no borrar
  la cookie que puso `login` en producción.
- **`transporte` y `frecuencia` son tablas placeholder.** `schema.sql` ya avisa que sus columnas
  son mínimas; el significado real de "frecuencia" (¿franja horaria? ¿ruta recurrente?) y su
  relación con `viaje` no está definido en ningún lado del código.
- Sin rate limiting en `/login`/`/register` (fuerza bruta), sin tests, sin manejo de errores
  centralizado.

## Fase 1 — Modelo de negocio y datos (hecho)

Es la base de todo lo demás: sin esto, ninguna regla de negocio tiene dónde vivir.

- [x] Separado conceptualmente **catálogo de viajes** (`/api/viajes`, antes `/compras`) de
  **reservas de un cliente** (`/api/reservas`, endpoint nuevo).
- [x] Nueva tabla `reserva` en `schema.sql`: `id`, `cedula_cl` (FK a `cliente`), `cod_bl` (FK a
  `viaje`), `cantidad`, `fecha_reserva`, `estado` (default `confirmada`).
- [x] Corregido el `DELETE` que borraba de `transporte` usando un id de `viaje` — ahora
  `deleteViaje` en `controllers/viajes.js` borra de `viaje` por `cod_bl`.
- [x] Regla de negocio central implementada en `controllers/reservas.js`: `createReserva` corre
  en una transacción (`BEGIN`/`COMMIT`/`ROLLBACK`) que bloquea la fila del viaje
  (`SELECT ... FOR UPDATE`), valida `cantidad <= asientosDispo_viaje`, descuenta y crea la
  reserva; si algún ítem del carrito falla, todo se revierte (compra todo-o-nada).
- [ ] Pendiente: `transporte`/`frecuencia` siguen siendo tablas placeholder — no se tocaron en
  este pase.
- [ ] Pendiente: cancelar una reserva (restaurar asientos) — no se implementó, ver "fuera de
  alcance" de la implementación.

## Fase 2 — Conectar el carrito con el backend (hecho)

- [x] `compraIncialState.products` (mock hardcodeado) eliminado de `compraReducer.js`; el
  carrito se llena desde `GET /api/viajes` (vía `Mostrar.jsx`, ahora el único listado en
  `Phase7.jsx`).
- [x] Nuevo endpoint `POST /api/reservas`: recibe el carrito completo al hacer checkout, valida
  disponibilidad de cada ítem y crea las reservas reales.
- [x] El carrito ya no es solo estado de React que se pierde al refrescar — al confirmar la
  compra en `Phase7.jsx` (botón "Confirmar Compra", requiere sesión iniciada), queda persistido
  en la base de datos asociado al `cliente` autenticado.

## Fase 3 — Autenticación y autorización

- Middleware `verifyToken` (lee la cookie `accessToken`, verifica el JWT) y protegerlo en las
  rutas de escritura: `POST/PUT/DELETE /viajes` (solo admin) y `POST /reservas` (cliente
  autenticado).
- Agregar `expiresIn` al `jwt.sign` de `login`, y unificar las opciones de la cookie
  (`httpOnly`, `secure`, `sameSite`) entre `login` y `logout` para que `clearCookie` funcione de
  forma confiable.
- Rate limiting básico en `/login` y `/register` (p. ej. `express-rate-limit`) para mitigar
  intentos de fuerza bruta.
- Completar `controllers/user.js#getUser` y arreglar la ruta `/find:userId` → `/find/:userId`.

## Fase 4 — Validación y manejo de errores

- Validar `req.body` con `zod` o `express-validator` en registro, login, creación de viaje y
  creación de reserva (formato de cédula/email, campos requeridos, números positivos en
  `costo_bl`/`asientosDispo_viaje`/`cantidad`).
- Middleware de manejo de errores centralizado: loguear el error real en el servidor y devolver
  siempre un mensaje genérico + código HTTP apropiado al cliente, nunca el objeto de error crudo
  de Postgres.
- [x] `PATCH /compras/:id` eliminado (nunca respondía) al mover las rutas a `routes/viajes.js` —
  `PUT` ya cubre el caso de actualizar un viaje.

## Fase 5 — Estructura y calidad

- [x] Rutas de viajes movidas de `server/index.js` a `routes/viajes.js` + `controllers/viajes.js`,
  siguiendo el mismo patrón que `auth`/`user`; mismo tratamiento para el nuevo
  `routes/reservas.js` + `controllers/reservas.js`.
- Variables de entorno separadas por ambiente (`NODE_ENV`), y revisar que `cors({origin: ...})`
  no quede hardcodeado a `localhost:3000` en producción.
- Tests de integración para: registro/login, CRUD de viajes, y el flujo completo de una reserva
  (crear reserva descuenta asientos, rechazar si no hay disponibilidad, cancelar restaura
  asientos).
- CI básico (lint + test) en GitHub Actions.
