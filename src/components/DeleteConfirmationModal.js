import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DeleteConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  return (
    <Modal isOpen={isOpen} toggle={onCancel}>
      <ModalHeader toggle={onCancel}>{title}</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={onConfirm}>
          Delete
        </Button>{' '}
        <Button color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteConfirmationModal;