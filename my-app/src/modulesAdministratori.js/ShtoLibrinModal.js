import React, { useState,useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ShtoLibrinModal = ({ showModal, closeModal }) => {

    const handleShtoClick = async () => {
        try {
                const titulli = document.querySelector('input[name="titulli"]').value;
                const linku = document.querySelector('input[name="linku"]').value;
                const autori = document.querySelector('input[name="autori"]').value;
                const dataPublikimit = document.querySelector('input[name="data"]').value;
                const isbn = document.querySelector('input[name="isbn"]').value;
                const fotoPath = document.querySelector('input[name="foto"]').value;

                const libriData = {
                    titulli,
                    linku,
                    autori,
                    kliket: 0,
                    dataPublikimit,
                    isbn,
                    fotoPath,
                };

                try {
                    const response = await axios.post('http://localhost:3002/', libriData);
                } catch (error) {
                    console.error('Error:', error);
                }
    
          toast.success('Libri u shtua me sukses', { autoClose: 1500 });
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
        <Modal.Title>Shto Librin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Modal.Body className='d-flex flex-column m-2 p-2'>

      <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='titulli'>Titulli i Librit:</label>
          <input type='text' name='titulli'  />
        </div>  

        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='autori'>Autori:</label>
          <input type='text' name='autori'  />
        </div>

        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='foto'>Foto:</label>
          <input type='link' name='foto'   />
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='isbn'>ISBN:</label>
          <input type='text' name='isbn' />
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='linku'>Linku:</label>
          <input type='link' name='linku' />
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='data'>Data e Publikimit:</label>
          <input type='date' name='data' />
        </div>    
      </Modal.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Anulo
        </Button>
        <Button variant="primary" onClick={() => handleShtoClick()}>
            Shto Librin
        </Button>
      </Modal.Footer>
      <ToastContainer position='top-center' />
    </Modal>
  );
};

export default ShtoLibrinModal;
