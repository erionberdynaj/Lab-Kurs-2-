import React, { useState,useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { userID } from '../router';
import axios  from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VendosVeretjeModal({ showModal, closeModal, nxID, nxenesiID, emriMbiemri }) {
  const [veretja, setVeretja] = useState('');

  const handleVendosClick = async () => {
    try {
        const komenti = document.querySelector('textarea[name="veretja"]').value;
        const stafiID = document.querySelector('select[name="mesimdhenesi"]').value;
        const nt = {
            komenti,
            stafiID,
            nxenesiID:nxID,
            dataVendosjes: new Date().toISOString(),
        };

      const response = await axios.post('https://localhost:44335/MesimdhenesiNxenes/veretjet', nt);
      console.log(response.data);

      
      toast.success('Veretja u vendos me sukses', { autoClose: 1500 });
        setTimeout(() => closeModal(), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const [mesimdhenesit, setMesimdhenesit] = useState([]);
    useEffect(() => {
        async function fetchData() {
          try {
            const result = await axios.get(`https://localhost:44335/mesimdhenesiNxenes/mesimdhenesitEStudentit/${nxID}`);
            const mesimdhenesit = result.data;
            setMesimdhenesit(mesimdhenesit);
          } catch (error) {
            console.error(error);
          }
        }
      
        if (showModal) {
          fetchData();
        }
      }, [showModal, nxenesiID]);
  return (
    <Modal show={showModal} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Vendos Veretje</Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column m-2 p-2'>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label htmlFor='nxenesiID'>ID e Studentit:</label>
          <input type='text' id='nxenesiID' value={nxenesiID} disabled />
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label htmlFor='emriMbiemri'>Emri i Studentit:</label>
          <input type='text' id='emriMbiemri' value={emriMbiemri} disabled />
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label htmlFor='veretja'>Veretja:</label>
          <textarea name='veretja' id='veretja' rows='4' value={veretja} onChange={(e) => setVeretja(e.target.value)} />
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
            <label name='mesimdhenesi'>Mesimdhenesi:</label>
            <select name='mesimdhenesi' >
                {mesimdhenesit.map((mesimdhenesi) => (
                        <option key={mesimdhenesi.ID} value={mesimdhenesi.ID}>{mesimdhenesi.emri_mbiemri} ({mesimdhenesi.stafiID})</option>
                    ))}
            </select>

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
