import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Entry } from '../types';

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};


const EntryDetails = ({ entry }: { entry: Entry }) => {
    const [{ diagnoses }] = useStateValue();
    switch (entry.type) {
        case 'Hospital':
            return (
                <Segment>
                    <h4>{entry.date} <Icon color='grey' name='doctor' size='big'/></h4>
                    <em>{entry.description}</em>
                    <br></br>
                    <p>Discharge Criteria: {entry.discharge.criteria}</p>
                    <p>Discharge Date: {entry.discharge.date}</p>
                    {entry.diagnosisCodes?.map(c => 
                        <li key={c}>{c} {Object.values(diagnoses).find(d => d.code === c)?.name}</li>
                    )}
                </Segment>
            );
        case 'OccupationalHealthcare':
            return (
                <Segment>
                    <h4>{entry.date} <Icon color='grey' name='doctor' size='big'/> {entry.employerName}</h4>
                    <em>{entry.description}</em>
                    {entry.sickLeave?.startDate ? <p>Sick Leave: {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}</p> : null}
                    {entry.diagnosisCodes?.map(c => 
                        <li key={c}>{c} {Object.values(diagnoses).find(d => d.code === c)?.name}</li>
                    )}
                </Segment>
            );
        case 'HealthCheck':
            return (
                <Segment>
                    <h4>{entry.date} <Icon color='grey' name='doctor' size='big'/></h4>
                    <em>{entry.description}</em>
                    {entry.diagnosisCodes?.map(c => 
                        <li key={c}>{c} {Object.values(diagnoses).find(d => d.code === c)?.name}</li>
                    )}
                </Segment>
            );
        default:
            return assertNever(entry);
    }
};


export default EntryDetails;