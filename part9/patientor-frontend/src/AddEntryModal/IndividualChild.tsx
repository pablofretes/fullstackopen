import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
import { NewEntry, Patient } from '../types';
import EntryDetails from './EntryDetails';
import { addNewDiagnosisEntry } from '../state';
import { apiBaseUrl } from '../constants';
import AddDiagnoseEntryModal from './EntryModal';
import { Button } from 'semantic-ui-react';


const IndividualChild = () => {
    const [{ patients }, dispatch] = useStateValue();

    const params = useParams<{ id: string }>();
    const id = params.id;
    const patient = patients[params.id];

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const submitNewDiagnosisEntry = async (values: NewEntry) => {
        try {
          const { data: newEntry } = await axios.post<Patient>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          dispatch(addNewDiagnosisEntry(newEntry));
          closeModal();
        } catch (e) {
          console.error(e.response?.data || 'Unknown Error');
          setError(e.response?.data?.error || 'Unknown error');
        }
    };

    return (
        <div>
            <h2>{patient.name}</h2>
            <p>occupation: {patient.occupation}</p>
            <h3>Entries</h3>
            <div>{patient.entries.map(e => 
                <EntryDetails entry={e} key={e.id}/>
            )}</div>
            <AddDiagnoseEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewDiagnosisEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={openModal}>Add Entry</Button>
        </div>
    );
};

export default IndividualChild;