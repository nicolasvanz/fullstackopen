
import { v4 as uuid } from "uuid";

import { NonSensetivePatient, Patient, NewPatientEntry } from "../../types";
import patients from "../../data/patients";

export const getAllNonSensetivePatients = (): NonSensetivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    { id, name, dateOfBirth, gender, occupation }
  ));
};

export const addPatient = (patient: NewPatientEntry): Patient => {
  /* eslint-disable-next-line @typescript-eslint/no-unsafe-call */
  const newPatientId: string = uuid() as string;
  const newPatient: Patient = {
    ...patient,
    id: newPatientId
  };
  
  patients.push(newPatient);
  return newPatient;
};