import React,{useState,useEffect} from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { userID } from '../router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function VendosNotenModal({ showModal, closeModal, nxID,nxenesiID,emriMbiemri }) {

    const handleVendosClick = async () => {
        try {
          const lendaID = document.querySelector('select[name="lenda"]').value;
          const notaNumer = document.querySelector('input[name="nota"]').value;

          let notaShkronje;
          switch (notaNumer) {
            case '5':
              notaShkronje = "A";
              break;
            case '4':
              notaShkronje = "B";
              break;
            case '3':
              notaShkronje = "C";
              break;
            case '2':
              notaShkronje = "D";
              break;
            case '1':
              notaShkronje = "E";
              break;
            default:
              notaShkronje = "N/A";
          }
          const nt = {
            lendaID,
            nxenesiID:nxID,
            stafiID: userID,
            notaNumer,
            notaShkronje,
            dataVendosjes: new Date().toISOString(),
          };

          const response = await axios.post('https://localhost:44335/MesimdhenesiNxenes', nt);
          console.log(response.data);

          
          toast.success('Nota u vendos me sukses', { autoClose: 1500 });
            setTimeout(() => closeModal(), 2000);

        } catch (error) {
          console.error(error);
        }
      };

     
    const [lendet, setLendet] = useState([]);
    useEffect(() => {
        async function fetchData() {
          try {
            const result = await axios.get(`https://localhost:44335/MesimdhenesiNxenes/${userID}/lendetEStudentit/${nxenesiID}`);
            const lendet = result.data;
            setLendet(lendet);
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
        <Modal.Title>Vendos Noten</Modal.Title>
      </Modal.Header>
       
        <Modal.Body className='d-flex flex-column m-2 p-2'>
            
          <div className='w-100 d-flex flex-column p-2 fs-5'>
            <label name='id'>ID e Studentit:</label>
            <input type='text' placeholder='Text Input' value={nxenesiID} disabled/>
          </div>
          <div className='w-100 d-flex flex-column p-2 fs-5'>
            <label name='emri'>Emri i Studentit:</label>
            <input type="text" name='emri' placeholder="" disabled value={emriMbiemri}/>
          </div>
          <div className='w-100 d-flex flex-column p-2 fs-5'>
            <label name='lenda'>Lenda:</label>
            <select name='lenda' >
                {lendet.map((lenda) => (
                    <option key={lenda.ID} value={lenda.ID}>{lenda.emri} nga Viti:{lenda.viti}</option>
                ))}
            </select>

          </div>
          <div className='w-100 d-flex flex-column p-2 fs-5'>
            <label name='nota'>Nota:</label>
            <input name='nota' type="number" defaultValue={1}  max={5} min={1} />
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
