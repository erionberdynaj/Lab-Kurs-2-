import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ShtoAdministratoriModal = ({ showModal, closeModal }) => {

    const handleShtoClick = async () => {
        try {
            const emri_mbiemri = document.querySelector('input[name="emri"]').value;
            const fjalekalimi = document.querySelector('input[name="fjalekalimi"]').value;
            const fotoPath = document.querySelector('input[name="foto"]').value;
            const nrTelefonit = document.querySelector('input[name="nrTelefonit"]').value;
            const vendbanimi = document.querySelector('input[name="vendbanimi"]').value;
            const Kualifikimi = document.querySelector('select[name="kualifikimi"]').value;

            const administratoriData= {
                emri_mbiemri,
                fjalekalimi,
                fotoPath, 
                nrTelefonit, 
                vendbanimi, 
                Kualifikimi,
                roli:'administratori'           
            };
    
          const response = await axios.post('https://localhost:44335/administratori', administratoriData);
          console.log(response.data);
    
          
          toast.success('Administratori u shtua me sukses', { autoClose: 1500 });
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
        <Modal.Title>Shto Administratorin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Modal.Body className='d-flex flex-column m-2 p-2'>
       
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='emri'>Emri i Administratori:</label>
          <input type='text' name='emri'  />
        </div>  

        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='fjalekalimi'>Fjalëkaliimi:</label>
          <input type='password' name='fjalekalimi'  />
        </div>

       
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='foto'>Foto:</label>
          <input type='link' name='foto' />
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='nrTelefonit'>Nr. Telefonit:</label>
          <input type='number' name='nrTelefonit' />
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='vendbanimi'>Vendbanimi:</label>
          <input type='text' name='vendbanimi' />
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='kualifikimi'>Kualifikimi:</label>
          <select type='text' name='kualifikimi' >
            <option>Bsc.</option>
            <option>Msc.</option>
            <option>Dr.</option>
            <option>Phd.</option>
          </select>
        </div>
        
      </Modal.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Anulo
        </Button>
        <Button variant="primary" onClick={() => handleShtoClick()}>
          Shto Administratorin
        </Button>
      </Modal.Footer>
      <ToastContainer position='top-center' />
    </Modal>
  );
};

export default ShtoAdministratoriModal;
