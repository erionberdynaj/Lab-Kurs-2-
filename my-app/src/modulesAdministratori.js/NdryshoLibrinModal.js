import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const NdryshoLibrinModal = ({ showModal, closeModal, titulli,autori,fotoPath,isbn,linku,dataPublikimit,_id }) => {

  const handleNdryshoClick = async () => {
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
            _id
        };

        try {
            const response = await axios.put(`http://localhost:3002/${_id}`, libriData);
            console.log(response)
        } catch (error) {
            console.error('Error:', error);
        }
    
      toast.success('Libri u ndryshua me sukses', { autoClose: 1500 });
      setTimeout(() => {
        closeModal();
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };


  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Ndrysho Librin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='titulli'>Titulli i Librit:</label>
          <input type='text' name='titulli' defaultValue={titulli} />
        </div>

        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='autori'>Autori:</label>
          <input type='text' name='autori' defaultValue={autori}  />
        </div>

        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='foto'>Foto:</label>
          <input type='link' name='foto' defaultValue={fotoPath}  />
        </div>

        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='isbn'>ISBN:</label>
          <input type='text' name='isbn' defaultValue={isbn}  />
        </div>

        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='linku'>Linku:</label>
          <input type='link' name='linku' defaultValue={linku}  />
        </div>

        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='data'>Data e Publikimit:</label>
          <input type='date' name='data' defaultValue={dataPublikimit}  />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeModal}>
          Anulo
        </Button>
        <Button variant='primary' onClick={handleNdryshoClick}>
          Ndrysho Librin
        </Button>
      </Modal.Footer>
      <ToastContainer position='top-center' />
    </Modal>
  );
};

export default NdryshoLibrinModal;
