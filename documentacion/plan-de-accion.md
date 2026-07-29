# Plan de acción — TIME TRAVELS

Roadmap priorizado en fases para seguir mejorando el proyecto después de la migración a
Postgres, el renombrado de `HTTP/` a `time-travels/` y la separación en `server/`/`client/`
(Fase 1, ya hecha).

## Fase 1 — Base de datos y estructura (hecho)

- [x] Migrar de MySQL (`mysql2`) a Postgres (`pg`), con credenciales en `.env`.
- [x] Renombrar `HTTP/` → `time-travels/`.
- [x] Reconstruir `schema.sql` (no existía ningún `.sql` en el repo original).
- [x] Agregar `.gitignore` y `package.json` del backend.
- [x] Separar `time-travels/` en `server/` (Express, antes mezclado con el frontend) y
  `client/` (React), cada uno con su propio `package.json`.
- [x] Configurar `client/` con Vite (no existía ningún `package.json` de frontend antes):
  `client/index.html` movido a la raíz del paquete y sin `%PUBLIC_URL%`.
- [x] Renombrar a `.jsx` los componentes que tenían JSX en un archivo `.js`
  (`Add`, `Editar`, `Mostar`, `CartItem`, `ProductItem`, `index`, `authContext`) — Vite/esbuild
  solo parsea JSX en `.jsx`/`.tsx` por defecto y el error
  `Failed to parse source for import analysis` apareció hasta hacer este cambio.

## Fase 2 — Backend

- Mover las rutas de `/compras` de `server/index.js` a su propio `routes/compras.js` +
  `controllers/compras.js`, siguiendo el mismo patrón que ya existe para `auth` y `user`.
- Completar `controllers/user.js` (`getUser` está vacío) y arreglar la ruta mal formada
  `router.get("/find:userId", ...)` → debería ser `/find/:userId`.
- Completar el `PATCH /compras/:id`, que hoy solo declara la variable `viajeId` y una query vacía.
- Revisar y completar `schema.sql`: las tablas `transporte` y `frecuencia` quedaron con columnas
  mínimas porque el código actual solo referencia sus IDs.

## Fase 3 — Seguridad

- Mover `JWT_SECRET` fuera del código a variables de entorno (ya resuelto en la Fase 1 vía
  `.env`, pero falta usarlo de forma consistente si se agregan más rutas firmadas).
- Agregar un middleware `verifyToken` y protegerlo en las rutas de escritura de `/compras`
  (`POST`, `PUT`, `DELETE`), que hoy están abiertas sin autenticación.
- Agregar validación de inputs (`express-validator` o `zod`) en registro, login y creación de
  viajes — hoy se insertan campos del `req.body` sin ningún tipo de validación.
- No devolver objetos de error crudos de Postgres al cliente (`res.status(500).json(err)`) —
  loguearlos en servidor y devolver un mensaje genérico.

## Fase 4 — Frontend

- Reconciliar el formulario de `client/src/principal/Editar.js` (pide `numAsientos`,
  `compañia_trans`, `conductor_trans`, `placa_trans`, `nUnidad_trans`, `tipo_trans`) con lo que
  realmente espera el backend en el `PUT /compras/:id` (`fecha_viaje`, `asientosDispo_viaje`,
  `costo_bl`, `horario_bol`, `horaDisp_frec`) — hoy el formulario no actualiza los campos
  correctos.
- Reemplazar `window.location.reload()` en `client/src/principal/Mostar.jsx` (tras borrar un
  viaje) por una actualización del estado local, para evitar el refresco completo de página.
- Revisar nombres de archivo con typos (`Mostar.jsx` → `Mostrar.jsx`).

## Fase 5 — Calidad

- Agregar pruebas de integración para las rutas CRUD de `/compras` y de `auth`
  (login/register/logout).
- Configurar un CI básico (lint + test) en GitHub Actions.
- Documentar las variables de entorno requeridas (`time-travels/.env.example` ya cubre esto,
  falta referenciarlo desde el README principal).
