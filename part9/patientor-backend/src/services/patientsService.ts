
import { v4 as uuid } from "uuid";

import { NonSensetivePatient, Patient, NewPatientEntry, EntryWithoutId, Entry } from "../../types";
import patients from "../../data/patients";

export const getAllNonSensetivePatients = (): NonSensetivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    { id, name, dateOfBirth, gender, occupation }
  ));
};

export const findNonSensetivePatientById = (id: string): NonSensetivePatient => {
  const patient = findPatientById(id);
  const { entries, ssn, ...nonSensetivePatient } = patient;
  return nonSensetivePatient;
};

export const findPatientById = (id: string): Patient => {
  const patient = patients.find(patient => patient.id === id);
  if (!patient)
    throw new Error("invalid patient id");
  return patient;
};

export const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatientId: string = uuid();
  const newPatient: Patient = {
    ...patient,
    id: newPatientId
  };
  
  patients.push(newPatient);
  return newPatient;
};

export const addEntryToPatient = (id: string, entry: EntryWithoutId): Entry => {
  const patient = findPatientById(id);
  const newEntry: Entry = {
    ...entry,
    id: uuid()
  };
  patient.entries.push(newEntry);
  return newEntry;
};