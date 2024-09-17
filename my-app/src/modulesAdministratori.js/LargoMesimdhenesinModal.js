import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LendaModal({ showModal, closeModal, ID }) {
  const handleDeleteItem = async () => {
    try {     
      const response = await axios.delete(`https://localhost:44335/mesimdhenesi/${ID}`);
      console.log(response.data);

      
      toast.success('Mesimdhenesi u eliminua me sukses', { autoClose: 1500 });
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
        <Modal.Title>Elimino Mesimdhenesin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      A jeni i sigurt qe deshironi te largoni Mesimdhenesin? <br/>
        (Eliminimi i ketij mesimdhenesi rezulton ne eliminimin e nxeneseve te tij gjithashtu)
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
