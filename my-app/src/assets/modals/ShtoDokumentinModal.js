import React, { useState,useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ShtoDokumentinModal = ({ showModal, closeModal,lendaID }) => {

    const handleShtoClick = async () => {
        try {
            const titulli = document.querySelector('input[name="titulli"]').value;
            const linku = document.querySelector('input[name="linku"]').value;
            const dt = {
                titulli,
                linku,
                dataPublikimit: new Date().toISOString(),
                lendaID              
            };
    
          const response = await axios.post('https://localhost:5001/dokumentet', dt);
          console.log(response.data);
    
          
          toast.success('Dokumenti u shtua me sukses', { autoClose: 1500 });
          setTimeout(() => {
            closeModal();
            window.location.reload();
          }, 2000);
        } catch (error) {
          console.error(error);
        }
    }

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Shto Dokumentin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Modal.Body className='d-flex flex-column m-2 p-2'>
       
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='titulli'>Titulli i Dokumentit:</label>
          <input type='text' name='titulli'  />
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='linku'>Linku i Dokumentit:</label>
          <input type='link' name='linku'   />
        </div>
      </Modal.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Anulo
        </Button>
        <Button variant="primary" onClick={() => handleShtoClick()}>
          Shto Dokumentin
        </Button>
      </Modal.Footer>
      <ToastContainer position='top-center' />
    </Modal>
  );
};

export default ShtoDokumentinModal;
