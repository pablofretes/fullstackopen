import React from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';

const IndividualChild = () => {
    const [{ patients }] = useStateValue();

    const params = useParams<{ id: string }>();
    const patient = patients[params.id];

    return (
        <div>
            <p>{patient.name}</p>
            <p>{patient.ssn}</p>
            <p>{patient.occupation}</p>
        </div>
    );
};

export default IndividualChild;