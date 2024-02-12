import { Gender, NewPatientEntry } from "./types";

export const toPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("incorrect or missing data");
  }

  if ("name" in object && "gender" in object && "dateOfBirth" in object && "ssn" in object && "occupation" in object) {
    const patient: NewPatientEntry = {
      name: parseName(object.name),
      gender: parseGender(object.gender),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      occupation: parseOccupation(object.occupation)
    };
    return patient;
  }
  throw new Error("missing some data fields");
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("invalid data on field name: " + name);
  }
  return name;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("invalid data on field gender: " + gender);
  }
  return gender;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("invalid data on field dateOfBirth: " + dateOfBirth);
  }
  return dateOfBirth;
};

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param));
}; 

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !isSsn(ssn)) {
    throw new Error("invalid data on field ssn: " + ssn);
  }
  return ssn;
};

const isSsn = (param: string): boolean => {
  const pattern = /\d{6}-([A-Z]|\d){3,4}/;
  return pattern.test(param);
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("incorrect data type on field occupation: " + occupation);
  }
  return occupation;
};

const isString = (param: unknown): param is string => {
  return typeof param === "string" || param instanceof String;
};

export default toPatientEntry;