import express from "express";
import { createReserva } from "../controllers/reservas.js";

const router = express.Router();

router.post("/", createReserva);

export default router;
