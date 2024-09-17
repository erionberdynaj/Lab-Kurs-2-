import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/mesimdhenesi.css';
import { userID } from '../router';
import { Button } from 'react-bootstrap';
import VendosNotenModal from './VendosNotenModal';
import VendosVeretjeModal from './VendosVeretjeModal';
import VendosMungesatModal from './VendosMungesatModal';


export default function MesimdhenesiStudentet() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:44335/mesimdhenesiNxenes/${userID}`);
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

  const [showNotenModal, setShowNotenModal] = useState(false);
  const [showVeretjeModal, setShowVeretjeModal] = useState(false);
  const [showMungesatModal, setShowMungesatModal] = useState(false);
  const [selectedNxenesiID, setSelectedNxenesiID] = useState('');
  const [selectedEmriMbiemri, setSelectedEmriMbiemri] = useState('');
  const [selectedNxID, setSelectedNxID] = useState('');

  const openNotenModal = (nxenesiID, emri_mbiemri, nxID) => {
    setSelectedNxenesiID(nxenesiID);
    setSelectedEmriMbiemri(emri_mbiemri);
    setSelectedNxID(nxID);
    setShowNotenModal(true);
  };

  const openVeretjeModal = (nxenesiID, emri_mbiemri, nxID) => {
    setSelectedNxenesiID(nxenesiID);
    setSelectedEmriMbiemri(emri_mbiemri);
    setSelectedNxID(nxID);
    setShowVeretjeModal(true);
  };

  const openMungesatModal = (nxenesiID, emri_mbiemri, nxID) => {
    setSelectedNxenesiID(nxenesiID);
    setSelectedEmriMbiemri(emri_mbiemri);
    setSelectedNxID(nxID);
    setShowMungesatModal(true);
  };
  const closeNotenModal = () => {
    setShowNotenModal(false);
  };

  const closeVeretjeModal = () => {
    setShowVeretjeModal(false);
  };

  const closeMungesatModal = () => {
    setShowMungesatModal(false);
  };
  return (
    <div>
      <br /><br />
      <div className='text-center pt-5 '>
        <input
          type='text'
          className='form-control w-50 mx-auto'
          placeholder='Kerko nxenesin ne baze te ID'
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className='d-flex flex-row flex-wrap justify-content-center align-items-center container p-5'>
        {filteredData.map((item, index) => (
          <div key={index} className='d-flex flex-column studentCard flex-wrap m-2 rounded justify-content-center align-items-center w-25'>
            
            <div className='data d-flex flex-row flex-wrap'>
              <img src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png" className='w-50 ' alt='User'></img>
              <div className='d-flex flex-column justify-content-center'>
                <h6 className='fs-5'>{item.emri_mbiemri}</h6>
                <p className=''>{item.nxenesiID}</p>
              </div>
            </div>
            <div className='buttons d-flex flex-row justify-content-between'>
             
            <Button className='vendosBtn fw-bold border px-2 bg-primary text-light' onClick={() => openNotenModal(item.nxenesiID,item.emri_mbiemri,item.ID)}>
              Vendos Noten
            </Button>
            <Button className='vendosBtn fw-bold border px-2 bg-primary text-light ' disabled={item.mesimdhenesiID == userID ? false : true} onClick={() => openVeretjeModal(item.nxenesiID,item.emri_mbiemri,item.ID)}>
              Vendos Vëretjen
            </Button>
            <Button className='vendosBtn fw-bold border px-2 bg-primary text-light' disabled={item.mesimdhenesiID == userID ? false : true} onClick={() => openMungesatModal(item.nxenesiID,item.emri_mbiemri,item.ID)}>
              Vendos Mungesat
            </Button>
            </div>
          </div>
        ))}
      </div>

      <VendosNotenModal showModal={showNotenModal} closeModal={closeNotenModal} nxenesiID={selectedNxenesiID} emriMbiemri={selectedEmriMbiemri} nxID={selectedNxID} />
      <VendosVeretjeModal showModal={showVeretjeModal} closeModal={closeVeretjeModal} nxenesiID={selectedNxenesiID} emriMbiemri={selectedEmriMbiemri} nxID={selectedNxID} />
      <VendosMungesatModal showModal={showMungesatModal} closeModal={closeMungesatModal} nxenesiID={selectedNxenesiID} emriMbiemri={selectedEmriMbiemri} nxID={selectedNxID} />

    
    </div>
    
  );
}