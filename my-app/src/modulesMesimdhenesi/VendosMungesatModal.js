import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function VendosMungesatModal({ showModal, closeModal,nxID, nxenesiID, emriMbiemri }) {


  const handleVendosClick = async () => {
    try {
        const meArsyje = document.querySelector('input[name="input1"]').value;
        const paArsyje = document.querySelector('input[name="input2"]').value;
        const nt = {
            meArsyje,
            paArsyje,
            nxenesiID:nxID,
            dataVendosjes: new Date().toISOString(),
        };

      const response = await axios.post('https://localhost:44335/MesimdhenesiNxenes/mungesat', nt);
      console.log(response.data);

      
      toast.success('Mungesat u vendosen me sukses', { autoClose: 1500 });
        setTimeout(() => closeModal(), 2000);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal show={showModal} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Vendos Mungesat</Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column m-2 p-2'>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='id'>ID e Studentit:</label>
          <input type='text' placeholder='Text Input' value={nxenesiID} disabled />
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='emri'>Emri i Studentit:</label>
          <input type="text" name='emri' placeholder="" disabled value={emriMbiemri} />
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='input1'>Nr. i Mungesave me Arsye:</label>
          <input type='number' name='input1' className='border border-primary' defaultValue={0} max={6} min={0} />
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='input2'>Nr. i Mungesave pa Arsye:</label>
          <input type='number' name='input2' className='border border-danger' defaultValue={0} max={6} min={0} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={closeModal}>
          Anulo
        </Button>
        <Button variant='primary' onClick={handleVendosClick}>
          Vendos
        </Button>
      </Modal.Footer>
      <ToastContainer position='top-center' />
    </Modal>
  );
}
