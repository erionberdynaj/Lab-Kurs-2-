// ShtoKomentinModal.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { userRole } from '../../router';
import axios from 'axios';

const ShtoKomentinModal = ({ showModal, closeModal ,blogID,autoriID}) => {
  
  const handleShtoKomentin = async () => {
    try {
        const komenti  = document.querySelector('textarea[name="komenti"]').value;
        const komentiData = {
          komenti,
          dataPublikimit:new Date().toISOString(),
          autoriID,
          blogID,
          roli:userRole
        };
        const response = await axios.post('https://localhost:5002/komentet/', komentiData);
        console.log(response.data);
      
        toast.success('Komenti u shtua me sukses', { autoClose: 1500 });
        setTimeout(() => {
          closeModal();
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error(error);
      }
      
}

  return (
    <Modal show={showModal} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Shto Komentin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <textarea
  className='form-control'
  name='komenti'
  rows={5}
  placeholder='Shkruaj komentin...'
/>

      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeModal}>
          Anulo
        </Button>
        <Button variant='primary' onClick={handleShtoKomentin}>
          Shto Komentin
        </Button>
      </Modal.Footer>
      <ToastContainer position='top-center' />
    </Modal>
  );
};

export default ShtoKomentinModal;
