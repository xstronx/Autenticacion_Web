import express from "express";
import { getViajes, createViaje, updateViaje, deleteViaje } from "../controllers/viajes.js";

const router = express.Router();

router.get("/", getViajes);
router.post("/", createViaje);
router.put("/:id", updateViaje);
router.delete("/:id", deleteViaje);

export default router;
