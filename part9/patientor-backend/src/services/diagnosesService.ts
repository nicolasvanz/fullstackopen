import { Diagnosis } from "../../types";
import diagnoses from "../../data/diagnoses";

export const getAllDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};
