import express from "express";
import { getAllDiagnoses } from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_req, res) => {
  const diagnoses = getAllDiagnoses();
  res.status(200).send(diagnoses);
});

export default router;