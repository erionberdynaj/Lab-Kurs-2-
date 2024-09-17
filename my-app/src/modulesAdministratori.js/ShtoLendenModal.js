import React, { useState,useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ShtoLendenModal = ({ showModal, closeModal }) => {

    const handleShtoClick = async () => {
        try {
            const emri = document.querySelector('input[name="emri"]').value;
            const mesimdhenesi = document.querySelector('select[name="mesimdhenesi"]').value;
            const gjenerata = document.querySelector('input[name="gjenerata"]').value;
            const viti = document.querySelector('input[name="viti"]').value;
            const lendaData= {
                emri,
                mesimdhenesi,
                viti,
                gjenerata              
            };
    
          const response = await axios.post('https://localhost:5001/lenda', lendaData);
          console.log(response.data);
    
          
          toast.success('Lenda u shtua me sukses', { autoClose: 1500 });
          setTimeout(() => {
            closeModal();
            window.location.reload();
          }, 2000);
        } catch (error) {
          console.error(error);
        }
    }
    const [mesimdhenesit, setMesimdhenesit] = useState([]);
    useEffect(() => {
        async function fetchData() {
          try {
            const result = await axios.get(`https://localhost:44335/mesimdhenesi/`);
            const mesimdhenesit = result.data;
            setMesimdhenesit(mesimdhenesit);
          } catch (error) {
            console.error(error);
          }
        }
      
        if (showModal) {
          fetchData();
        }
      }, [showModal]);

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Shto Lenden</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Modal.Body className='d-flex flex-column m-2 p-2'>
       
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='emri'>Emri i Lendes:</label>
          <input type='text' name='emri'  />
        </div>

        <div className='w-100 d-flex flex-column p-2 fs-5'>
            <label name='mesimdhenesi'>Mesimdhenesi:</label>
            <select name='mesimdhenesi' >
                {mesimdhenesit.map((mesimdhenesi) => (
                    <option key={mesimdhenesi.ID} value={mesimdhenesi.ID}>{mesimdhenesi.emri_mbiemri} me ID:{mesimdhenesi.stafiID}</option>
                ))}
            </select>

          </div>

        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='gjenerata'>Gjenerata:</label>
          <input type='text' name='gjenerata'   />
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='viti'>Viti:</label>
          <input type='number' name='viti' defaultValue={1} min={1} max={3}   />
        </div>
        
      </Modal.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Anulo
        </Button>
        <Button variant="primary" onClick={() => handleShtoClick()}>
          Shto Lenden
        </Button>
      </Modal.Footer>
      <ToastContainer position='top-center' />
    </Modal>
  );
};

export default ShtoLendenModal;
