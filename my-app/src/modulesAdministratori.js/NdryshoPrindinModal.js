import React, {useEffect,useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const NdryshoPrindinModal = ({ showModal, closeModal,prindiID,emri_mbiemri,fjalekalimi,email,ID }) => {
    const handleNdryshoClick = async () => {
        try {
          const emri_mbiemri = document.querySelector('input[name="emri"]').value;
          const fjalekalimi = document.querySelector('input[name="fjalekalimi"]').value;
          const email = document.querySelector('input[name="email"]').value;

          const prindiData= {
              emri_mbiemri,          
              email,
              fjalekalimi,
              ID
                
          };
            const response = await axios.put(`https://localhost:5001/prindi`, prindiData);
            console.log(response.data);
          
            toast.success('Prindi u ndryshua me sukses', { autoClose: 1500 });
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
        <Modal.Title>Ndrysho Prindin</Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column m-2 p-2'>
        
      <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='prindiID'>ID e Prindit:</label>
          <input type='text' name='prindiID' disabled defaultValue={prindiID}  />
        </div> 

        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='emri'>Emri dhe Mbiemri i Prindit:</label>
          <input type='text' name='emri' defaultValue={emri_mbiemri} />
        </div> 
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='fjalekalimi'>Fjalekalimi:</label>
          <input type='text' name='fjalekalimi' defaultValue={fjalekalimi} />
        </div>  

        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='email'>Email:</label>
          <input type='email' name='email'   defaultValue={email}/>
        </div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Anulo
        </Button>
        <Button variant="primary" onClick={() => handleNdryshoClick()}>
          Ndrysho Prindin
        </Button>
      </Modal.Footer>
      <ToastContainer position='top-center' />
    </Modal>
  );
};

export default NdryshoPrindinModal;
