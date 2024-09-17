import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LendaModal({ showModal, closeModal, dokumentiID }) {
  const handleDeleteItem = async () => {
    try {     
      const response = await axios.delete(`https://localhost:5001/dokumentet/${dokumentiID}`);
      console.log(response.data);

      
      toast.success('Dokumenti u eliminua me sukses', { autoClose: 1500 });
      setTimeout(() => {
        closeModal();
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        A jeni i sigurt qe deshironi te largoni kete Dokument?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Anulo
        </Button>
        <Button variant="danger" onClick={handleDeleteItem}>
          Elimino
        </Button>
      </Modal.Footer>
      <ToastContainer position='top-center' />
    </Modal>
  );
}
