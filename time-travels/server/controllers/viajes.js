import db from "../routes/connect.js";

export const getViajes = async (req, res) => {
  const q = "SELECT * FROM viaje";
  try {
    const result = await db.query(q);
    return res.json(result.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const createViaje = async (req, res) => {
  const q = "INSERT INTO viaje(cod_bl, fecha_viaje, asientosDispo_viaje, costo_bl, horario_bol, horaDisp_frec, cedula_cl, id_frecuencia, id_transporte) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";

  const values = [
    req.body.cod_bl,
    req.body.fecha_viaje,
    req.body.asientosDispo_viaje,
    req.body.costo_bl,
    req.body.horario_bol,
    req.body.horaDisp_frec,
    req.body.cedula_cl,
    req.body.id_frecuencia,
    req.body.id_transporte,
  ];

  try {
    const result = await db.query(q, values);
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateViaje = async (req, res) => {
  const codBl = req.params.id;
  const q = "UPDATE viaje SET fecha_viaje = $1, asientosDispo_viaje = $2, costo_bl = $3, horario_bol = $4, horaDisp_frec = $5 WHERE cod_bl = $6";

  const values = [
    req.body.fecha_viaje,
    req.body.asientosDispo_viaje,
    req.body.costo_bl,
    req.body.horario_bol,
    req.body.horaDisp_frec,
  ];

  try {
    const result = await db.query(q, [...values, codBl]);
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteViaje = async (req, res) => {
  const codBl = req.params.id;
  const q = "DELETE FROM viaje WHERE cod_bl = $1";

  try {
    const result = await db.query(q, [codBl]);
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};
