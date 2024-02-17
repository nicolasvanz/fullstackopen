import { SyntheticEvent, useState } from "react";
import { Alert, Box } from "@mui/material";
import { TextField, Button } from "@mui/material";

import { Diagnosis, EntryWithoutId, Patient } from "../types";
import patientsService from "../services/patients";
import { AxiosError } from "axios";

interface AddEntryFormProps {
  patient: Patient
}

const AddEntryForm = (props: AddEntryFormProps) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis["code"]>>([]);
  const [error, setError] = useState<string>("");

  const notifyError = (msg: string) => {
    setError(msg);
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const onSubmitAddEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    const entryToAdd: EntryWithoutId = {
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes,
    };
    patientsService.addEntry(props.patient.id, entryToAdd)
      .then((savedEntry => {
        props.patient.entries.push(savedEntry);
      }))
      .catch((error: unknown) => {
        let message = "error";
        if (error instanceof AxiosError) {
          message += ": " + error.response?.data.error;
        }
        notifyError(message);
      });
  };

  return (
    <>
    { error !== "" && <Alert severity="error">{error}</Alert>}
    <Box sx={{borderStyle: "dashed", borderWidth: 1, padding: 2}}>
      <h3>New Health entry</h3>
      <form onSubmit={onSubmitAddEntry}>
        <TextField
          variant="standard"
          label="Description"
          fullWidth
          value={description}
          onChange={({target}) => setDescription(target.value)}
        />
        <TextField
          variant="standard"
          label="Date"
          fullWidth
          value={date}
          onChange={({target}) => setDate(target.value)}
        />
        <TextField
          variant="standard"
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({target}) => setSpecialist(target.value)}
        />
        <TextField
          variant="standard"
          label="Healthcheck Rating"
          fullWidth
          value={healthCheckRating}
          onChange={({target}) => setHealthCheckRating(Number(target.value))}
        />
        <TextField
          sx={{
            marginBottom: 1
          }}
          variant="standard"
          label="Diagnoses codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({target}) => setDiagnosisCodes(target.value.split(","))}
        />
        <Button
          // sx={{
          //   float: "right"
          // }}
          type="submit"
          variant="contained"
        >Add</Button>
      </form>
    </Box>
    </>
  );
};

export default AddEntryForm;