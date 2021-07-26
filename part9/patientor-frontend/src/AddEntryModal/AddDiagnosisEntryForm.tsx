import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form, FormikErrors } from "formik";

import { TextField, DiagnosisSelection, EntryOptions, SelectFieldEntry, NumberField } from "../AddPatientModal/FormField";
import { NewEntry, EntryValues, EntryValuesTypes, HealthCheckRating } from "../types";
import { useStateValue } from "../state";
import { parseDate } from "../utils";

export interface PropsEntry {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const newEntryOptions: EntryOptions[] = [
  { value: 'Hospital', label: 'Hospital' },
  { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
  { value: 'HealthCheck', label: 'HealthCheck'}
];

const initialValues: EntryValues = {
  type: EntryValuesTypes.Hospital,
  date: '',
  description: '',
  specialist: '',
  diagnosisCodes: [],
  discharge: {
    date: '',
    criteria: '',
  },
  employerName: '',
  sickLeave: {
    endDate: '',
    startDate: ''
  },
  healthCheckRating: HealthCheckRating.CriticalRisk
};

const AddDiagnosisEntryForm = ({ onSubmit, onCancel }: PropsEntry) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const incorrectValue = "Maximum value is 3, minimum value is 0";
                const invalidDate = "Invalid Date, please indroduce a date with the placeholder format";
                let errors: FormikErrors<EntryValues> = {};

                if(!values.type) {
                  errors.type = requiredError;
                }
                if(!values.date) {
                  errors.date = requiredError;
                }
                if(parseDate(values.date) === null){
                  errors.date = invalidDate;
                }
                if(!values.description) {
                  errors.description = requiredError;
                }
                if(!values.specialist) {
                  errors.specialist = requiredError;
                }
                if(!values.diagnosisCodes) {
                  errors.diagnosisCodes = requiredError;
                }
                if(values.type === EntryValuesTypes.Hospital && !values.discharge.date){
                  errors = {
                    discharge: {
                      date: requiredError
                    }
                  };
                }
                if(values.type === EntryValuesTypes.Hospital && !values.discharge.criteria){
                  errors = {
                    discharge: {
                      criteria: requiredError
                    }
                  };
                }
                if(values.type === EntryValuesTypes.Hospital && values.discharge.date){
                  if(parseDate(values.discharge.date) === null){
                    errors = {
                      discharge: {
                        date: invalidDate
                      }
                    };
                  }
                }
                if(values.type === EntryValuesTypes.OccupationalHealthcare){
                  if(!values.employerName) {
                    errors.employerName = requiredError;
                  }
                }
                if(values.type === EntryValuesTypes.HealthCheck){
                  if(!values.healthCheckRating) {
                    errors.healthCheckRating = requiredError;
                  }
                  if(values.healthCheckRating < 0 || values.healthCheckRating > 3){
                    errors.healthCheckRating = incorrectValue;
                  }
                }
                if(values.type === EntryValuesTypes.OccupationalHealthcare && values.sickLeave.startDate){
                  if(parseDate(values.sickLeave.startDate) === null){
                    errors = {
                      sickLeave: {
                        startDate: invalidDate
                      }
                    };
                  }
                }
                if(values.type === EntryValuesTypes.OccupationalHealthcare && values.sickLeave.endDate){
                  if(parseDate(values.sickLeave.endDate) === null){
                    errors = {
                      sickLeave: {
                        endDate: invalidDate
                      }
                    };
                  }
                }
                return errors;
            }}
        >
        {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
            return (
            <Form className='form-iu'>
                <SelectFieldEntry 
                  label='Type of Entry'
                  name='type'
                  options={newEntryOptions}
                />
                <Field
                    label='Date'
                    placeholder='YYYY-MM-DD'
                    name='date'
                    component={TextField}
                />
                <Field
                    label='Description'
                    placeholder='A Description of the new entry'
                    name='description'
                    component={TextField} 
                />
                <Field 
                    label='Specialist'
                    placeholder='M.D. House'
                    name='specialist'
                    component={TextField}
                />
                <DiagnosisSelection
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    diagnoses={Object.values((diagnoses))}
                />
                {values.type === EntryValuesTypes.Hospital ? 
                  (
                    <div>
                      <Field 
                        label='Discharge Date'
                        placeholder='YYYY-MM-DD'
                        name='discharge.date'
                        component={TextField}
                      />
                      <Field 
                        label='Discharge Criteria'
                        placeholder='Cured Explosive Diarrhea'
                        name='discharge.criteria'
                        component={TextField}
                      />
                    </div>
                  )
                : null}
                {values.type === EntryValuesTypes.OccupationalHealthcare ?
                  (
                    <div>
                      <Field 
                        label='Employer Name'
                        placeholder='FullStack Enterprise'
                        name='employerName'
                        component={TextField}
                      />
                      <Field 
                        label='Sick Leave Start Date'
                        placeholder='YYYY-MM-DD'
                        name='sickLeave.startDate'
                        component={TextField}
                      />
                      <Field 
                        label='Sick Leave End Date'
                        placeholder='YYYY-MM-DD'
                        name='sickLeave.endDate'
                        component={TextField}
                      />
                    </div>
                  ) : null
                }
                {values.type === EntryValuesTypes.HealthCheck ? 
                  (
                    <div>
                      <Field
                        label='Health Check Rating'
                        min={0}
                        max={3}
                        name='healthCheckRating'
                        component={NumberField}
                      />
                    </div>
                  )
                : null}
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>);
        }}
        </Formik>
    );
};

export default AddDiagnosisEntryForm;