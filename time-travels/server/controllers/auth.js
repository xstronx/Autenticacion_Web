import db from "../routes/connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        //check user if exists
        const q = "SELECT * FROM cliente WHERE usuario = $1";
        const existing = await db.query(q, [req.body.usuario]);
        if (existing.rows.length) return res.status(409).json("User already exists!");

        //crear nuevo usuario
        //hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.clave, salt);

        const insertQ = "INSERT INTO cliente (cedula, usuario, email, clave, nombre, direccion) VALUES ($1, $2, $3, $4, $5, $6)";
        const values = [req.body.cedula, req.body.usuario, req.body.email, hashedPassword, req.body.nombre, req.body.direccion];

        await db.query(insertQ, values);
        return res.status(200).json("User has been created");
    } catch (err) {
        return res.status(500).json(err);
    }
};

export const login = async (req, res) => {
    try {
        const q = "SELECT * FROM cliente WHERE usuario = $1";
        const result = await db.query(q, [req.body.usuario]);

        if (result.rows.length === 0) return res.status(404).json("User not found");

        const user = result.rows[0];
        const checkPassword = bcrypt.compareSync(req.body.clave, user.clave);

        if (!checkPassword) return res.status(400).json("Wrong password or username!");

        const token = jwt.sign({ id: user.cedula }, process.env.JWT_SECRET);

        const { clave, ...others } = user;

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others);
    } catch (err) {
        return res.status(500).json(err);
    }
};

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none",
    }).status(200).json("User has been logged out");
};
