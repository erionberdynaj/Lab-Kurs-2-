import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Button} from 'react-bootstrap'
import { BiTrash,BiPencil } from 'react-icons/bi';
import DeleteTopicModal from './Modals/LargoDokumentinModal'
import ShtoDokumentinModal from './Modals/ShtoDokumentinModal';
import NdryshoDokumentinModal from './Modals/NdryshoDokumentinModal';
import { userRole } from '../router';


export default function Lenda() {
    const { lendaID } = useParams(); // ketu marrim URL si "lendaID = id"
    const [, id] = lendaID.split("="); // ndersa ketu ndahet id nga "lendaID ="

    const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:5001/Dokumentet/${id}`);
        const userData = result.data;
        setUserData(userData); // set state here
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const formatDateTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();
    return `${date} - ${time}`;
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShtoDokumentinModal, setShowShtoDokumentinModal] = useState(false);
  const [showNdryshoDokumentinModal, setShowNdryshoDokumentinModal] = useState(false);
  const [selectedDokumentiID, setSelectedDokumentiID] = useState('');
  const [selectedLendaID, setLendaID] = useState('');
  const [selectedTitulli, setselectedTitulli] = useState('');
  const [selectedLinku, setSelectedLinku] = useState('');


  const openDeleteModal = (dokumentiID) => {
    setSelectedDokumentiID(dokumentiID);
    setShowDeleteModal(true);
  };
  const openShtoDokumentinModal = (idLendes) =>{
    setLendaID(idLendes);
    setShowShtoDokumentinModal(true)
  }
  const openNdryshoDokumentinModal = (idLendes,dokumentiID,titulli,linku) =>{
    setLendaID(idLendes);
    setSelectedDokumentiID(dokumentiID);
    setselectedTitulli(titulli);
    setSelectedLinku(linku);
    setShowNdryshoDokumentinModal(true);
  }
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const closeShtoDokumentinModal = () => {
    setShowShtoDokumentinModal(false);
  };
  const closeNdryshoDokumentinModal = () => {
    setShowNdryshoDokumentinModal(false);
  };

  return (
    <>
    
      <Button className='float-right btn btn-success float-end mx-5 my-3 p-2' onClick={() => openShtoDokumentinModal(id)}>
        Shto Dokumentin
      </Button>      
      <br/><br/><br/>
      <div className='py-3 px-3'>
        {userData.map((item, index) => (
            <div key={index}>
            <h2 className='mt-5'>Topic {index + 1}</h2>
            <hr></hr>
            <ul>
                <li className='fs-4' key="titulli">
                    <strong className=''>Titulli: </strong>
                    <a href={item.linku}>{item.titulli}</a>
                    {userRole !== 'nxenesi'?<div>
                    <Button className='bg-transparent border-0 float-end m-1' onClick={() => openDeleteModal(item.ID)}><BiTrash className='text-danger fs-2 '/></Button>
                    <Button className='bg-transparent border-0 float-end m-1' onClick={() => openNdryshoDokumentinModal(id,item.ID,item.titulli,item.linku)} value={item.ID}><BiPencil className='text-primary fs-2'/></Button>
                    </div>:''}
                </li>
                <li className='list-unstyled' key="data">
                    {formatDateTime(item.dataPublikimit)}
                </li>
            </ul>
            </div>
        ))}
      </div>
      <br/><br/>
      <DeleteTopicModal showModal={showDeleteModal} closeModal={closeDeleteModal} dokumentiID={selectedDokumentiID}/>
      <ShtoDokumentinModal showModal={showShtoDokumentinModal} closeModal={closeShtoDokumentinModal} lendaID={selectedLendaID}/>
      <NdryshoDokumentinModal showModal={showNdryshoDokumentinModal} closeModal={closeNdryshoDokumentinModal} lendaID={selectedLendaID} dokumentiID={selectedDokumentiID} titulli={selectedTitulli} linku ={selectedLinku}/>

    </>
  );
}
