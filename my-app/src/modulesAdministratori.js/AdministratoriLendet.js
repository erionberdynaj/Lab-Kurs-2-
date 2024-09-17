import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table,Button } from 'react-bootstrap';
import ShtoLendenModal from './ShtoLendenModal';
import NdryshoLendenModal from './NdryshoLendenModal';
import LargoLendenModal from './LargoLendenModal'
export default function AdministratoriLendet() {

  const [lendet, setLendet] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:5001/lenda/lendetAdministrator`);
        const lendet = result.data;
        setLendet(lendet);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const [showShtoLendenModal, setShowShtoLendenModal] = useState(false);
  const [showNdryshoLendenModal, setShowNdryshoLendenModal] = useState(false);
  const [showLargoLendenModal, setShowLargoLendenModal] = useState(false);
  const [selectedLendaID, setSelectedLendaID] = useState('');
  const [selectedLendaEmri, setSelectedLendaEmri] = useState('');
  const [selectedLendaStafiID, setSelectedLendaStafiID] = useState('');
  const [selectedLendaViti, setSelectedLendaViti] = useState('');
  const [selectedLendaGjenerata, setSelectedLendaGjenerata] = useState('');

  const openShtoLendenModal = () => {
    setShowShtoLendenModal(true);
  };
  const openNdryshoLendenModal = (lendaID,emri,viti,gjenerata,stafiID) =>{
    setSelectedLendaID(lendaID)
    setSelectedLendaEmri(emri)
    setSelectedLendaStafiID(stafiID)
    setSelectedLendaViti(viti)
    setSelectedLendaGjenerata(gjenerata)
    setShowNdryshoLendenModal(true)
  }
  const openLargoLendenModal = (lendaID) =>{
    setSelectedLendaID(lendaID)
    setShowLargoLendenModal(true)
  }
  const closeShtoLendenModal = () => {
    setShowShtoLendenModal(false);
  };
  const closeNdryshoLendenModal = () => {
    setShowNdryshoLendenModal(false);
  };
  const closeLargoLendenModal = () => {
    setShowLargoLendenModal(false);
  };

  return (
    <div>
       <div className='p-4'>
        <Button className='btn btn-success mt-5 float-end' onClick={() => openShtoLendenModal()}>Shto nje Lende</Button> 
       </div>
      <div className='container pt-5 mb-5 pb-5'>
      {lendet.length > 0 ? (
          <>
        <h2 className='my-3'>Lendet:</h2>
        <Table striped bordered hover className='mb-5 pb-5'>
            <thead>
            <tr>
                <th>Nr.</th>
                <th>Lenda</th>
                <th>Mesimdhenesi</th>
                <th>Viti</th>
                <th>Gjenerata</th>
                <th>Opsionet</th>
                
            </tr>
            </thead>
            <tbody>
            {lendet.map((item, index) => (
                <tr key={index}>
                <td>{index+1}</td>
                <td>{item.emri}</td>
                <td>{item.mesimdhenesi} / {item.stafiID}</td>
                <td>{item.viti}</td>
                <td>{item.gjenerata}</td>
                <td>
                    <Button className='btn btn-primary m-1' onClick={() => openNdryshoLendenModal(item.ID,item.emri,item.viti,item.gjenerata,item.stafiID)}>Ndrysho</Button>
                    <Button className='btn btn-danger m-1' onClick={() => openLargoLendenModal(item.ID)}>Largo</Button>
                </td>
                </tr>
            ))}
            </tbody>
        </Table>
        </>
        ) : (
            <h2 className='my-3'>Nuk ka ndonje Lende te regjistruar</h2>
        )}
      </div>
      <ShtoLendenModal showModal={showShtoLendenModal} closeModal={closeShtoLendenModal}/>
      <NdryshoLendenModal showModal={showNdryshoLendenModal} closeModal={closeNdryshoLendenModal} lendaID={selectedLendaID} emri={selectedLendaEmri} stafiID={selectedLendaStafiID} viti={selectedLendaViti} gjenerata={selectedLendaGjenerata}/>
      <LargoLendenModal showModal={showLargoLendenModal} closeModal={closeLargoLendenModal} lendaID={selectedLendaID}/>
    </div>
  );
}
