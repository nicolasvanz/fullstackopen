import { useEffect, useState } from "react";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import {Diagnosis, Entry, Patient} from "../types";
import patientsService from "../services/patients";
import diagnosesService from "../services/diagnoses";

interface PatientInfoProps {
  patientId: string
}

interface PatientEntryProps {
  entry: Entry
}

const PatientEntry = (props: PatientEntryProps) => {
  const entry = props.entry;
  const [diagnoses, setDiagnoses] = useState<Array<Diagnosis>>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);

    };
    fetchDiagnoses();
  });

  const findDiagnoseByCode = (code: Diagnosis["code"]): Diagnosis | undefined => {
    return diagnoses.find(d => d.code === code);
  };

  return (
    <div>
      <p>{entry.date} {entry.description}</p>
      <ul>
        {
          entry.diagnosisCodes &&
          entry.diagnosisCodes.map(dc => {
            const diagnosisObject = findDiagnoseByCode(dc);
            return <li key={dc}>{dc} {diagnosisObject ? diagnosisObject.name : null}</li>;
          })
        }
      </ul>
    </div>
  );
};

const PatientInfo = (props: PatientInfoProps) => {
  const [patient, setPatient] = useState<Patient>();

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
            <PatientEntry key={entry.id} entry={entry}/>
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