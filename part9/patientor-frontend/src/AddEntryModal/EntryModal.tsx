import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddDiagnosisEntryForm from './AddDiagnosisEntryForm';
import { NewEntry } from '../types';

interface PropsEntry {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: NewEntry) => void;
    error?: string;
  }
  
const AddDiagnoseEntryModal = ({ modalOpen, onClose, onSubmit, error }: PropsEntry) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddDiagnosisEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
);

export default AddDiagnoseEntryModal;