// ShtoKomentinModal.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { userRole } from '../../router';
import axios from 'axios';

const NdryshoKomentinModal = ({ showModal, closeModal ,komentiID,komenti}) => {

  const handleNdryshoKomentin = async () => {
    try {
        const komenti  = document.querySelector('textarea[name="komenti"]').value;

        const komentiData = {
          komenti,
          ID:komentiID
        };
        const response = await axios.put('https://localhost:5002/komentet', komentiData);
        console.log(response.data);
      
        toast.success('Komenti u ndryshua me sukses', { autoClose: 1500 });
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
        <Modal.Title>Ndrysho Komentin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <textarea className='form-control' name='komenti' rows={5} placeholder='Shkruaj komentin...' defaultValue={komenti}/>

      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeModal}>
          Anulo
        </Button>
        <Button variant='primary' onClick={handleNdryshoKomentin}>
          Ndrysho Komentin
        </Button>
      </Modal.Footer>
      <ToastContainer position='top-center' />
    </Modal>
  );
};

export default NdryshoKomentinModal;
