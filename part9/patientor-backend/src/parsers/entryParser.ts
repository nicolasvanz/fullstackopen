import {
  BaseEntryWithoutId,
  Diagnosis,
  Discharge,
  ENTRY_TYPES,
  EntryType,
  EntryWithoutId,
  HealthCheckEntryWithoutId,
  HealthCheckRating,
  HospitalEntryWithoutId,
  OccupationalHealthcareEntryWithoutId,
  SickLeave
} from "../../types";

export const assertNever = (value: never): never => {
  throw new Error(
    `unexpected endpoint reached handling: ${JSON.stringify(value)}`
  );
};

const toEntryWithoutId = (obj: unknown): EntryWithoutId => {
  if (!obj || typeof obj !== "object")
    throw new Error("incorrect or missing data");

  if (!("type" in obj))
    throw new Error("type not specified");

  const baseEntry = parseBaseEntry(obj);

  const type = parseType(obj.type);
  switch(type) {
    case "HealthCheck":
      if (!("healthCheckRating" in obj))
        throw new Error("missing healthCheckRating");
      const healthCheckRatingEntry: HealthCheckEntryWithoutId = {
        ...baseEntry,
        type,
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating)
      };
      return healthCheckRatingEntry;
    case "Hospital":
      if (!("discharge" in obj))
        throw new Error("missing discharge");
      const hospitalEntry: HospitalEntryWithoutId = {
        ...baseEntry,
        type,
        discharge: parseDischarge(obj.discharge)
      };
      return hospitalEntry;
    case "OccupationalHealthcare":
      if (!("employerName" in obj)) 
        throw new Error("missing employer name");
      const occupationalHealthcareEntry: OccupationalHealthcareEntryWithoutId = {
        ...baseEntry,
        type,
        employerName: parseEmployerName(obj.employerName)
      };
      if ("sickLeave" in obj)
        occupationalHealthcareEntry["sickLeave"] = parseSickLeave(obj.sickLeave);

      return occupationalHealthcareEntry;
    default:
      assertNever(type);
  }
  throw new Error("unexpected error");
};

const parseBaseEntry = (obj: unknown): BaseEntryWithoutId => {
  if (!obj || typeof obj !== "object")
  throw new Error("incorrect or missing data");

  if (!("description" in obj && "date" in obj && "specialist" in obj && "type" in obj))
    throw new Error("missing base entry fields");

  const baseEntry: BaseEntryWithoutId = {
    description: parseDescription(obj.description),
    date: parseDate(obj.date),
    specialist: parseSpecialist(obj.specialist),
  };
  if ("diagnosesCodes" in obj) {
    baseEntry["diagnosisCodes"] = parseDiagnoses(obj.diagnosesCodes);
  }
  return baseEntry;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object")
    throw new Error("bad discharge input");
  
  if (!("date" in discharge && "criteria" in discharge))
    throw new Error("missing discharge fields");
  
  const parsedDischarge: Discharge = {
    date: parseDate(discharge.date),
    criteria: parseDischargeCriteria(discharge.criteria)
  };
  return parsedDischarge;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== "object")
    throw new Error("bad sick leave input");
  if (!("startDate" in sickLeave && "endDate" in sickLeave))
    throw new Error("missing sickleave fields");
  const parsedSickLeave: SickLeave = {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate)
  };
  return parsedSickLeave;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName))
    throw new Error("bad employer name input");
  return employerName;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!(isNumber(healthCheckRating) || isString(healthCheckRating)) || !isHealthCheckRating(healthCheckRating))
    throw new Error("bad health check rating");
  return healthCheckRating;
};

const parseDiagnoses = (diagnoses: unknown): Array<Diagnosis["code"]> => {
  if (!Array.isArray(diagnoses) || !diagnoses.find(d => !isString(d)))
    throw new Error("bad diagnoses input");
  return diagnoses as Array<Diagnosis["code"]>;
};

const parseType = (type: unknown): EntryType => {
  if (!isString(type) || !isType(type))
    throw new Error("bad type input");
  return type;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description))
    throw new Error("bad description input");
  return description;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date))
    throw new Error("bad date input");
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist))
    throw new Error("bad specialist input");
  return specialist;
};

const parseDischargeCriteria = (criteria: unknown): string => {
  if (!isString(criteria))
    throw new Error("bad discharge criteria input");
  return criteria;
};

const isHealthCheckRating = (param: number | string): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isType = (param: string): param is EntryType => {
  return ENTRY_TYPES.includes(param as EntryType);
};

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param));
};

const isNumber = (param: unknown): param is number => {
  return !isNaN(Number(param));
};

const isString = (param: unknown): param is string => {
  return typeof param === "string" || param instanceof String;
};

export default toEntryWithoutId;