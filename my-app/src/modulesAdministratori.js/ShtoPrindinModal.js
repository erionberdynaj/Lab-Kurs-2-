import React, { useState,useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ShtoPrindinModal = ({ showModal, closeModal }) => {

    const handleShtoClick = async () => {
        try {
            const emri_mbiemri = document.querySelector('input[name="emri"]').value;
            const fjalekalimi = document.querySelector('input[name="fjalekalimi"]').value;
        

            const prindiData= {
                emri_mbiemri,
                fjalekalimi          
            };
    
          const response = await axios.post('https://localhost:5001/prindi', prindiData);
          console.log(response.data);
    
          
          toast.success('Prindi u shtua me sukses', { autoClose: 1500 });
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
        <Modal.Title>Shto Prindin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Modal.Body className='d-flex flex-column m-2 p-2'>
       
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='emri'>Emri i Prindit:</label>
          <input type='text' name='emri'  />
        </div>

        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='fjalekalimi'>Fjalekalimi:</label>
          <input type='password' name='fjalekalimi' />
        </div>
        
      </Modal.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Anulo
        </Button>
        <Button variant="primary" onClick={() => handleShtoClick()}>
          Shto Prindin
        </Button>
      </Modal.Footer>
      <ToastContainer position='top-center' />
    </Modal>
  );
};

export default ShtoPrindinModal;
