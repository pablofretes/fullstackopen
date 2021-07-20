import React from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
import EntryDetails from './EntryDetails';

const IndividualChild = () => {
    const [{ patients }] = useStateValue();

    const params = useParams<{ id: string }>();
    const patient = patients[params.id];

    return (
        <div>
            <h2>{patient.name}</h2>
            <p>occupation: {patient.occupation}</p>
            <h3>Entries</h3>
            <div>{patient.entries.map(e => 
                <EntryDetails entry={e} key={e.id}/>
            )}</div>
        </div>
    );
};

export default IndividualChild;