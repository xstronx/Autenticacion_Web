-- Esquema reconstruido para Postgres a partir de las queries existentes en el código.
-- No existía ningún .sql en el repo original (MySQL); estas tablas se infirieron
-- leyendo controllers/auth.js e index.js. Las columnas de "transporte" y "frecuencia"
-- son mínimas y solo cubren lo que el código referencia (sus IDs) — revisar y
-- completar según el modelo real antes de usarlo en producción.

CREATE TABLE IF NOT EXISTS cliente (
    cedula      VARCHAR(20) PRIMARY KEY,
    usuario     VARCHAR(50) UNIQUE NOT NULL,
    email       VARCHAR(100) NOT NULL,
    clave       VARCHAR(255) NOT NULL,
    nombre      VARCHAR(100) NOT NULL,
    direccion   VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS frecuencia (
    id_frecuencia   SERIAL PRIMARY KEY,
    horaDisp_frec   VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS transporte (
    id_transporte   SERIAL PRIMARY KEY,
    tipo_trans      VARCHAR(50),
    placa_trans     VARCHAR(20),
    compania_trans  VARCHAR(100),
    conductor_trans VARCHAR(100),
    nUnidad_trans   VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS viaje (
    cod_bl              VARCHAR(20) PRIMARY KEY,
    fecha_viaje         DATE,
    asientosDispo_viaje INTEGER,
    costo_bl            NUMERIC(10, 2),
    horario_bol         VARCHAR(50),
    horaDisp_frec       VARCHAR(50),
    cedula_cl           VARCHAR(20) REFERENCES cliente(cedula),
    id_frecuencia       INTEGER REFERENCES frecuencia(id_frecuencia),
    id_transporte       INTEGER REFERENCES transporte(id_transporte)
);

-- Reserva real de un cliente sobre un viaje (distinta del catálogo de viajes de arriba).
-- Al crearse descuenta asientosDispo_viaje del viaje correspondiente (ver controllers/reservas.js).
CREATE TABLE IF NOT EXISTS reserva (
    id              SERIAL PRIMARY KEY,
    cedula_cl       VARCHAR(20) REFERENCES cliente(cedula),
    cod_bl          VARCHAR(20) REFERENCES viaje(cod_bl),
    cantidad        INTEGER NOT NULL,
    fecha_reserva   TIMESTAMP DEFAULT NOW(),
    estado          VARCHAR(20) DEFAULT 'confirmada'
);
