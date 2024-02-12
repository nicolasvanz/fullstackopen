import express from "express";

import { getAllNonSensetivePatients } from "../services/patientsService";
import toPatientEntry from "../../utils";
import { addPatient } from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = getAllNonSensetivePatients();
  res.status(200).send(patients);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toPatientEntry(req.body);
    const savedPatient = addPatient(newPatientEntry);
    res.json(savedPatient);
  } catch(error: unknown) {
    let errorMessage = "something went wrong";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;