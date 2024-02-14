import { useEffect, useState } from "react";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import {Patient} from "../types";
import patientsService from "../services/patients";

interface Props {
  patientId: string
}

const PatientInfo = (props: Props) => {
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
      </div>
    );
  else
    return (
      <p>loading...</p>
    );
};

export default PatientInfo;