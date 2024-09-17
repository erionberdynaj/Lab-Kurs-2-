import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const NdryshoAdministratoretModal = ({ showModal, closeModal,administratoriID,stafiID,emri_mbiemri,email,fotoPath,nrTelefonit,vendbanimi,kualifikimi }) => {

    const handleNdryshoClick = async () => {
        try {
          const emri_mbiemri = document.querySelector('input[name="emri"]').value;
          const email = document.querySelector('input[name="email"]').value;
          const fotoPath = document.querySelector('input[name="foto"]').value;
          const nrTelefonit = document.querySelector('input[name="nrTelefonit"]').value;
          const vendbanimi = document.querySelector('input[name="vendbanimi"]').value;
          const Kualifikimi = document.querySelector('select[name="kualifikimi"]').value;

          const administratoriData= {
              stafiID,
              emri_mbiemri,
              email,
              fotoPath, 
              nrTelefonit, 
              vendbanimi, 
              Kualifikimi,
              roli:'administratori',
              ID:administratoriID          
          };
          
            const response = await axios.put(`https://localhost:44335/mesimdhenesi`, administratoriData);
            console.log(response.data);
          
            toast.success('Administratori u ndryshua me sukses', { autoClose: 1500 });
            setTimeout(() => {
              closeModal();
              window.location.reload();
            }, 2000);
          } catch (error) {
            console.error(error.response.data);
          }
          
    }


  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Ndrysho Administratorin</Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column m-2 p-2'>
        
      <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='stafiID'>ID e Administratorit:</label>
          <input type='text' name='stafiID' disabled defaultValue={stafiID}  />
        </div> 

        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='emri'>Emri i Administratorit:</label>
          <input type='text' name='emri' defaultValue={emri_mbiemri} />
        </div>  

        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='email'>Email:</label>
          <input type='email' name='email'   defaultValue={email}/>
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='foto'>Foto:</label>
          <input type='link' name='foto' defaultValue={fotoPath}/>
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='nrTelefonit'>Nr. Telefonit:</label>
          <input type='number' name='nrTelefonit' defaultValue={nrTelefonit}/>
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='vendbanimi'>Vendbanimi:</label>
          <input type='text' name='vendbanimi' defaultValue={vendbanimi}/>
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='kualifikimi'>Kualifikimi:</label>
          <select type='text' name='kualifikimi' defaultValue={kualifikimi}>
            <option>Bsc.</option>
            <option>Msc.</option>
            <option>Dr.</option>
            <option>Phd.</option>
          </select>
        </div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Anulo
        </Button>
        <Button variant="primary" onClick={() => handleNdryshoClick()}>
          Ndrysho Administratorin
        </Button>
      </Modal.Footer>
      <ToastContainer position='top-center' />
    </Modal>
  );
};

export default NdryshoAdministratoretModal;
