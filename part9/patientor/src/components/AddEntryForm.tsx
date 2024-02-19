import { SyntheticEvent, useState } from "react";
import { Alert, Box, SelectChangeEvent } from "@mui/material";
import { TextField, Button, Select, MenuItem, OutlinedInput, Checkbox, ListItemText } from "@mui/material";

import { Diagnosis, EntryWithoutId, Patient, Entry, ENTRY_TYPES, EntryType } from "../types";
import patientsService from "../services/patients";
import { AxiosError } from "axios";
import { assertNever } from "../utils";

interface AddEntryFormProps {
  patient: Patient,
  diagnoses: Array<Diagnosis>
}

const AddEntryForm = (props: AddEntryFormProps) => {
  const [type, setType] = useState<Entry["type"]>("HealthCheck");
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis["code"]>>([]);
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  const [employerName, setEmployerName] = useState<string>('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>('');
  const [error, setError] = useState<string>("");

  const notifyError = (msg: string) => {
    setError(msg);
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const onSubmitAddEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    let entryToAdd: EntryWithoutId;

    switch(type) {
      case "HealthCheck":
        entryToAdd = {
          type,
          description,
          date,
          specialist,
          healthCheckRating,
          diagnosisCodes
        };
        break;
      case "Hospital":
        entryToAdd = {
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        };
        break;
      case "OccupationalHealthcare":
        entryToAdd = {
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate
          }
        };
        break;
      default:
        throw new Error(assertNever(type));
        
    }

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

  const isType = (type: string): type is EntryType => {
    return ENTRY_TYPES.map(s => s.toString()).includes(type);
  };

  const handleTypeChange = (selectedType: string): EntryType => {
    if (!isType(selectedType)) {
      notifyError("bad type input");
      throw new Error("bad type input");
    }
    return selectedType;
  };

  const specificTypeEntryInput = () => {
    switch(type) {
      case "HealthCheck":
        return (
          <TextField
            variant="standard"
            label="Healthcheck Rating"
            fullWidth
            value={healthCheckRating}
            onChange={({target}) => setHealthCheckRating(Number(target.value))}
          />
        );
      case "Hospital":
        return (
          <>
          <TextField
            variant="standard"
            label="discharge date"
            type="date"
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />
          <TextField
            variant="standard"
            label="discharge criteria"
            fullWidth
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
          />
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
          <TextField
            variant="standard"
            label="employerName"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
          <TextField
            variant="standard"
            label="sick leave start date"
            type="date"
            fullWidth
            value={sickLeaveStartDate}
            onChange={({ target }) => setSickLeaveStartDate(target.value)}
          />
          <TextField
            variant="standard"
            label="sick leave end date"
            type="date"
            fullWidth
            value={sickLeaveEndDate}
            onChange={({ target }) => setSickLeaveEndDate(target.value)}
          />
          </>
        );
      default:
        assertNever(type);
    }
  };

  const handleDiagnosesCodesChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(", ") : value);
  };

  return (
    <>
    { error !== "" && <Alert severity="error">{error}</Alert>}
    <Box sx={{borderStyle: "dashed", borderWidth: 1, padding: 2}}>
      <h3>New entry</h3>
      <form onSubmit={onSubmitAddEntry}>
        <Select
          label="Type"
          fullWidth
          value={type}
          onChange={({ target }) => setType(handleTypeChange(target.value))}
        >
        {ENTRY_TYPES.map(option =>
          <MenuItem
            key={option}
            value={option}
          >
            {option}
          </MenuItem>
        )}
        </Select>
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
          type="date"
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
        {specificTypeEntryInput()}
        <Select
          label="diagnoses codes"
          multiple
          value={diagnosisCodes}
          fullWidth
          onChange={handleDiagnosesCodesChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {props.diagnoses.map((diagnose) => (
            <MenuItem key={diagnose.code} value={diagnose.code}>
              <Checkbox checked={diagnosisCodes.indexOf(diagnose.code) > -1} />
              <ListItemText primary={diagnose.code} />
            </MenuItem>
          ))}
        </Select>
        <Button
          type="submit"
          variant="contained"
        >Add</Button>
      </form>
    </Box>
    </>
  );
};

export default AddEntryForm;