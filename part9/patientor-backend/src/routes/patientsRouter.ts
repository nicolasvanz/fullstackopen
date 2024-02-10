import express from "express";
import { getAllNonSensetivePatients } from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = getAllNonSensetivePatients();
  res.status(200).send(patients);
});

export default router;