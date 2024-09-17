import React, {useEffect,useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ShtoNxenesinModal = ({ showModal, closeModal }) => {

    const handleShtoClick = async () => {
        try {
            const emri_mbiemri = document.querySelector('input[name="emri"]').value;
            const fjalekalimi = document.querySelector('input[name="fjalekalimi"]').value;
            const fotoPath = document.querySelector('input[name="foto"]').value;
            const nrTelefonit = document.querySelector('input[name="nrTelefonit"]').value;
            const vendbanimi = document.querySelector('input[name="vendbanimi"]').value;

            const selectElement = document.querySelector('select[name="prindi"]');
            const selectedOption = selectElement.selectedOptions[0];
            const prindiID = selectedOption.value;
            const value = selectedOption.textContent;
            const parts = value.split(' me ID:');
            const emriPrindit = parts[0];

            const drejtimi = document.querySelector('select[name="drejtimi"]').value;
            const mesimdhenesiID = document.querySelector('select[name="mesimdhenesi"]').value;
            const drejtimiID = (drejtimi === 'Shkenca Natyrore') ? '2' : '1';

            
            
            const nxenesiData= {
                emri_mbiemri,
              
                fjalekalimi,            
                fotoPath, 
                vendbanimi,
                nrTelefonit,       
                drejtimi,
                emriPrindit,
                prindiID,
                drejtimiID,
                mesimdhenesiID 
            };
    
          const response = await axios.post('https://localhost:5001/nxenesi', nxenesiData);
          console.log(response.data);
    
          
          toast.success('Nxenesi u shtua me sukses', { autoClose: 1500 });
          setTimeout(() => {
            closeModal();
            window.location.reload();
          }, 2000);
        } catch (error) {
          console.error(error);
        }
    }

    const [prinderit, setPrindi] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:5001/prindi`);
        const prinderit = result.data;
        setPrindi(prinderit);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const [mesimdhenesit, setMesimdhenesi] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:44335/mesimdhenesi`);
        const mesimdhenesit = result.data;
        setMesimdhenesi(mesimdhenesit);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
 
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Shto Nxenesin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Modal.Body className='d-flex flex-column m-2 p-2'>
       
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='emri'>Emri dhe Mbiemri i Nxenesit:</label>
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
          <label name='prindi'>Prindi:</label>
          <select type='text' name='prindi' >
          {prinderit.map((prindi) => (
                    <option key={prindi.ID} value={prindi.ID}>{prindi.emri_mbiemri} me ID:{prindi.prindiID}</option>
                ))}
          </select>
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='drejtimi'>Drejtimi:</label>
          <select type='text' name='drejtimi' >
            <option>Shkenca Shoqerore</option>
            <option>Shkenca Natyrore</option>
          </select>
        </div>
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='mesimdhenesi'>Mesimdhenesi Kujdestar:</label>
          <select type='text' name='mesimdhenesi' >
          {mesimdhenesit.map((mesimdhenesi) => (
                    <option key={mesimdhenesi.ID} value={mesimdhenesi.ID}>{mesimdhenesi.emri_mbiemri} me ID:{mesimdhenesi.stafiID}</option>
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
          Shto Nxenesin
        </Button>
      </Modal.Footer>
      <ToastContainer position='top-center' />
    </Modal>
  );
};

export default ShtoNxenesinModal;
