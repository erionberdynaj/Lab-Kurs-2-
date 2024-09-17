import React, { useState,useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ShtoLendenStudentitModal = ({ showModal, closeModal,nxenesiID,nxenesi }) => {

    const handleShtoClick = async () => {
        try {

            const lendaID = document.querySelector('select[name="lendet"]').value;
            const selectElement = document.querySelector('select[name="lendet"]');
            const selectedOption = selectElement.options[selectElement.selectedIndex];
            const optionContent = selectedOption.textContent;
            const lenda = optionContent.split(' ')[0];
       
            const lendaData= {
                nxenesi,
                lenda,
                nxenesiID,
                lendaID              
            };
    
          const response = await axios.post('https://localhost:5001/lenda_nxenesi', lendaData);
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
    const [lendet, setLendet] = useState([]);
    useEffect(() => {
        async function fetchData() {
          try {
            const result = await axios.get(`https://localhost:5001/lenda_nxenesi/lendetEMbetura/${nxenesiID}`);
            const lendet = result.data;
            setLendet(lendet);
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
        <Modal.Title>Shto Lenden tek Nxenesi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Modal.Body className='d-flex flex-column m-2 p-2'>
       <div className='w-100 d-flex flex-column p-2 fs-5'>
            <label name='lendet'>Lendet:</label>
            <select name='lendet' >
                {lendet.map((lenda) => (
                    <option key={lenda.ID} value={lenda.ID}>{lenda.emri} e vitit: {lenda.viti}</option>
                ))}
            </select>

          </div>       
      </Modal.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Anulo
        </Button>
        <Button variant="primary" onClick={() => handleShtoClick()}>
        Shto Lenden tek Nxenesi
        </Button>
      </Modal.Footer>
      <ToastContainer position='top-center' />
    </Modal>
  );
};

export default ShtoLendenStudentitModal;
