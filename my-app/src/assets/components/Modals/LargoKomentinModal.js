import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LargoKomentinModal({ showModal, closeModal, komentiID }) {
  const handleDeleteItem = async () => {
    try {     
      const response = await axios.delete(`https://localhost:5002/komentet/${komentiID}`);
      console.log(response.data);

      
      toast.success('Komenti u eliminua me sukses', { autoClose: 1500 });
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
        <Modal.Title>Elimino Komentin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        A jeni i sigurt qe deshironi te largoni Komentin?
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
