import db from "../routes/connect.js";

export const createReserva = async (req, res) => {
  const { cedula_cl, items } = req.body;

  if (!cedula_cl || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json("Datos de reserva incompletos");
  }

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    for (const item of items) {
      const { rows } = await client.query(
        "SELECT asientosDispo_viaje FROM viaje WHERE cod_bl = $1 FOR UPDATE",
        [item.cod_bl]
      );

      if (rows.length === 0 || rows[0].asientosdispo_viaje < item.cantidad) {
        throw new Error(`Sin disponibilidad para el viaje ${item.cod_bl}`);
      }

      await client.query(
        "UPDATE viaje SET asientosDispo_viaje = asientosDispo_viaje - $1 WHERE cod_bl = $2",
        [item.cantidad, item.cod_bl]
      );

      await client.query(
        "INSERT INTO reserva (cedula_cl, cod_bl, cantidad) VALUES ($1, $2, $3)",
        [cedula_cl, item.cod_bl, item.cantidad]
      );
    }

    await client.query("COMMIT");
    return res.status(200).json("Reserva creada");
  } catch (err) {
    await client.query("ROLLBACK");
    return res.status(400).json(err.message || "No se pudo completar la reserva");
  } finally {
    client.release();
  }
};
