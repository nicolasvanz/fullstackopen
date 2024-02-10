import { NonSensetivePatient } from "../../types";
import patients from "../../data/patients";

export const getAllNonSensetivePatients = (): NonSensetivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
    { id, name, dateOfBirth, gender, occupation }
  ));
};