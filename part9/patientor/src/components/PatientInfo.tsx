import { useEffect, useState } from "react";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

import {Diagnosis, Entry, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry, Patient} from "../types";
import patientsService from "../services/patients";
import diagnosesService from "../services/diagnoses";
import { assertNever } from "../utils";

interface PatientInfoProps {
  patientId: string
}

interface PatientEntryInfoProps {
  entry: Entry,
  diagnoses: Array<Diagnosis>
}

interface PatientInfoPropsBase {
  entry: Entry,
  findDiagnoseByCode: (code: Diagnosis["code"]) => Diagnosis | undefined
}

interface HealthCheckEntryInfoProps extends PatientInfoPropsBase {
  entry: HealthCheckEntry,
}

interface HospitalEntryInfoProps extends PatientInfoPropsBase {
  entry: HospitalEntry
}

interface OccupationalHealthcareEntryInfoProps extends PatientInfoPropsBase {
  entry: OccupationalHealthcareEntry
}

const PatientEntry = (props: PatientEntryInfoProps) => {
  const entry = props.entry;
  
  const findDiagnoseByCode = (code: Diagnosis["code"]): Diagnosis | undefined => {
    return props.diagnoses.find(d => d.code === code);
  };

  const style = {
    borderStyle: "solid",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    paddingLeft: 10
  };

  switch(entry.type) {
    case "HealthCheck":
      return <div style={style}>
        <HealthCheckEntryInfo entry={entry as HealthCheckEntry} findDiagnoseByCode={findDiagnoseByCode} />
      </div>;
    case "Hospital":
      return <div style={style}>
        <HospitalEntryInfo entry={entry as HospitalEntry} findDiagnoseByCode={findDiagnoseByCode}/>
      </div>;
    case "OccupationalHealthcare":
      return <div style={style}>
        <OccupationalHealthcareEntryInfo entry={entry as OccupationalHealthcareEntry} findDiagnoseByCode={findDiagnoseByCode}/>
      </div>;
    default:
      assertNever(entry);
  }
};

const HealthCheckEntryInfo = (props: HealthCheckEntryInfoProps) => {
  const entry = props.entry;
  return (
    <div>
      <p>{entry.date} <MedicalServicesIcon /></p>
      {entry.description}
      <ul>
        {
          entry.diagnosisCodes &&
          entry.diagnosisCodes.map(dc => {
            const diagnosisObject = props.findDiagnoseByCode(dc);
            return <li key={dc}>{dc} {diagnosisObject ? diagnosisObject.name : null}</li>;
          })
        }
      </ul>
      {entry.healthCheckRating === HealthCheckRating.Healthy && <FavoriteIcon style={{color: "green"}} />}
      {entry.healthCheckRating === HealthCheckRating.LowRisk && <FavoriteIcon style={{color: "yellow"}} />}
      {entry.healthCheckRating === HealthCheckRating.HighRisk && <FavoriteIcon style={{color: "orange"}} />}
      {entry.healthCheckRating === HealthCheckRating.CriticalRisk && <FavoriteIcon style={{color: "red"}} />}
      <br />
      diagnose by {entry.specialist}
    </div>
  );
};

const HospitalEntryInfo = (props: HospitalEntryInfoProps) => {
  const entry = props.entry;
  return (
    <div>
      <p>{entry.date} <LocalHospitalIcon /></p>
      {entry.description}
      <ul>
        {
          entry.diagnosisCodes &&
          entry.diagnosisCodes.map(dc => {
            const diagnosisObject = props.findDiagnoseByCode(dc);
            return <li key={dc}>{dc} {diagnosisObject ? diagnosisObject.name : null}</li>;
          })
        }
      </ul>
      {entry.discharge.criteria} at {entry.discharge.date}
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

const OccupationalHealthcareEntryInfo = (props: OccupationalHealthcareEntryInfoProps) => {
  const entry = props.entry;
  return (
    <div>
      <p>{entry.date}<WorkIcon /> {entry.employerName}</p>
      {entry.description}
      <ul>
        {
          entry.diagnosisCodes &&
          entry.diagnosisCodes.map(dc => {
            const diagnosisObject = props.findDiagnoseByCode(dc);
            return <li key={dc}>{dc} {diagnosisObject ? diagnosisObject.name : null}</li>;
          })
        }
      </ul>
      diagnose by {entry.specialist}
    </div>
  );
};

const PatientInfo = (props: PatientInfoProps) => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Array<Diagnosis>>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);

    };
    fetchDiagnoses();
  });

  useEffect(() => {
    const fecthPatient = async () => {
      const patient = await patientsService.getById(props.patientId);
      setPatient(patient);
    };
    fecthPatient();
  }, []);
  
  if (patient)
    return (
      <div>
        <h2>
          {patient.name}
          {patient.gender === "male" && <MaleIcon />}
          {patient.gender === "female" && <FemaleIcon />}
        </h2>
        <p>ssh: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h3>Entries</h3>
        {
          patient.entries.map(entry =>
            <PatientEntry key={entry.id} entry={entry} diagnoses={diagnoses}/>
          )
        }
      </div>
    );
  else
    return (
      <p>loading...</p>
    );
};

export default PatientInfo;