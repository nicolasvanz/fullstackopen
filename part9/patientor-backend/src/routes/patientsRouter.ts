import express from "express";

import { findPatientById, getAllNonSensetivePatients } from "../services/patientsService";
import toPatientEntry from "../../utils";
import { addPatient } from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = getAllNonSensetivePatients();
  res.status(200).send(patients);
});

router.get("/:id", (req, res) => {
  try {
    const patient = findPatientById(req.params.id);
    res.status(200).json(patient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message});
    }
  }
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