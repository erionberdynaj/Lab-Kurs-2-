import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/mesimdhenesi.css';
import { id } from '../router';
import {Link} from 'react-router-dom'
import { Button,Table } from 'react-bootstrap';
import ShtoNxenesinModal from './ShtoNxenesinModal';
import LargoNxenesinModal from './LargoNxenesinModal';

export default function AdministratoriStudentet() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:5001/nxenesi/`);
        const userData = result.data;
        setUserData(userData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  /* ketu kemi filtrim e te dhenave ne baze te search */
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = userData.filter((item) =>
    item.nxenesiID.includes(searchText)
  );

  const [showShtoNxenesinModal,setShowNxenesinModal] = useState(false)
  const [showLargoNxenesinModal,setShowLargoNxenesinModal] = useState(false)
  const [IdNxenesit,setIdNxenesit] = useState('')
  const openShtoNxenesinModal = () =>{
    setShowNxenesinModal(true)
  }
  const openLargoNxenesinModal = (ID) =>{
    setIdNxenesit(ID)
    setShowLargoNxenesinModal(true)
  }
  const closeShtoNxenesinModal = () =>{
    setShowNxenesinModal(false)
  }
  const closeLargoNxenesinModal = () =>{
    setShowLargoNxenesinModal(false)
  }
  return (
    <div>
      <br /><br />
      <div className='text-center pt-5 d-flex flex-row justify-content-center align-items-center'>
        <input type='text' className='form-control w-50 mx-auto' placeholder='Kerko nxenesin ne baze te ID' value={searchText} onChange={handleSearchChange}/>
        <Button className='btn btn-success mx-5 float-end' onClick={() => openShtoNxenesinModal()}>Shto nje Nxenes</Button> 
      </div>
      <div className='p-4'>
         
        </div>
      <Table striped bordered hover className='mb-5 pb-5 container mt-5'>
            <thead>
            <tr>
                <th>Nr.</th>
                <th>Emri dhe Mbiemri</th>
                <th>ID</th>
                <th>Email</th>
                <th>Emri i Prindit</th>
                <th>Nr i Telefonit</th>
                <th>Opsionet</th>
            </tr>
            </thead>
            <tbody>
            {filteredData.map((item, index) => (
                <tr key={index}>
                <td>{index+1}</td>
                <td>{item.emri_mbiemri}</td>
                <td>{item.nxenesiID}</td>
                <td>{item.email}</td>
                <td>{item.emriPrindit}</td>
                <td>{item.nrTelefonit}</td>
                <td>
                <Link to={`${window.location.href}/studentiID=${item.ID}`} className='btn btn-primary m-1'>Detaje </Link>                    
                <Button className='btn btn-danger m-1' onClick={() => openLargoNxenesinModal(item.ID)}>Largo</Button>
                </td>
                </tr>
            ))}
            </tbody>
        </Table>
        <ShtoNxenesinModal showModal={showShtoNxenesinModal} closeModal={closeShtoNxenesinModal} />
        <LargoNxenesinModal showModal={showLargoNxenesinModal} closeModal={closeLargoNxenesinModal} ID={IdNxenesit}/>

    </div>
    
  );
}