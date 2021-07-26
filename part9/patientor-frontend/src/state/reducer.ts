import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  { 
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIANGOSIS_LIST";
    payload: Diagnosis[]
  }
  | {
    type: "ADD_DIAGNOSIS_ENTRY";
    payload: Patient;
  };

export const setPatientListFromApi = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const addNewPatient = (content: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: content
  };
};

export const setDiagnosisListFromApi = (diagnosesList: Diagnosis[]): Action => {
  return {
    type: "SET_DIANGOSIS_LIST",
    payload: diagnosesList
  };
};

export const addNewDiagnosisEntry = (content: Patient): Action => {
  return {
    type: "ADD_DIAGNOSIS_ENTRY",
    payload: content
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id] : patient }),
            {}
          ),
          ...state.patients
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIANGOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis}),
            {}
          ),
          ...state.diagnoses
        },
      };
    case "ADD_DIAGNOSIS_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
