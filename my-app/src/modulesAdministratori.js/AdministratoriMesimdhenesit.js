import React, {useState,useEffect} from "react";
import axios from "axios";
import {Table,Button} from 'react-bootstrap'
import ShtoMesimdhenesinModal from "./ShtoMesimdhenesinModal";
import LargoMesimdhenesinModal from "./LargoMesimdhenesinModal";
import NdryshoMesimdhenesinModal from './NdryshoMesimdhenesinModal'

export default function AdministratoriMesimdhenesit(){

    const [mesimdhenesit, setMesimdhenesit] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:44335/mesimdhenesi`);
        const mesimdhenesit = result.data;
        setMesimdhenesit(mesimdhenesit);
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

  const filteredData = mesimdhenesit.filter((item) =>
    item.stafiID.includes(searchText)
  );

    const [showShtoMesimdhenesinModal,setShowShtoMesimdhenesinModal] = useState(false)
    const [showLargoMesimdhenesinModal,setShowLargoMesimdhenesinModal] = useState(false)
    const [showNdryshoMesimdhenesinModal,setShowNdryshoMesimdhenesinModal] = useState(false)
    const [mesimdhenesiID,setMesimdhenesiID] = useState('')
    const [stafiID,setStafiID] = useState('')
    const [emri_mbiemri,setEmri_mbiemri] = useState('')
    const [email,setEmail] = useState('')
    const [fotoPath,setFotoPath] = useState('')
    const [nrTelefonit,setNrTelefonit] = useState('')
    const [vendbanimi,setVendbanimi] = useState('')
    const [kualifikimi,setKualifikimi] = useState('')

    const openShtoMesimdhenesinModal = () =>{
        setShowShtoMesimdhenesinModal(true)
    }
    const openLargoMesimdhenesinModal = (mesimdhenesiID) =>{
        setMesimdhenesiID(mesimdhenesiID)
        setShowLargoMesimdhenesinModal(true)
    }
    const openNdryshoMesimdhenesinModal = (mesimdhenesiID,stafiID,emri_mbiemri,email,fotoPath,nrTelefonit,vendbanimi,kualifikimi) =>{
        setMesimdhenesiID(mesimdhenesiID)
        setStafiID(stafiID)
        setEmri_mbiemri(emri_mbiemri)
        setEmail(email)
        setFotoPath(fotoPath)
        setNrTelefonit(nrTelefonit)
        setVendbanimi(vendbanimi)
        setKualifikimi(kualifikimi)
        setShowNdryshoMesimdhenesinModal(true)
    }
    const closeShtoMesimdhenesinModal = () =>{
        setShowShtoMesimdhenesinModal(false)
    }
    const closeLargoMesimdhenesinModal = () =>{
        setShowLargoMesimdhenesinModal(false)
    }
    const closeNdryshoMesimdhenesinModal = () =>{
        setShowNdryshoMesimdhenesinModal(false)
    
    }

    return(
        
        <div>
            <br /><br />
            <div className='text-center pt-5 d-flex flex-row justify-content-center align-items-center'>
                <input type='text' className='form-control w-50 mx-auto' placeholder='Kerko Mesimdhenesin ne baze te ID' value={searchText} onChange={handleSearchChange}/>
                <Button className='btn btn-success mx-5 float-end' onClick={() => openShtoMesimdhenesinModal()}>Shto nje Mesimdhenes</Button> 
            </div>
        
       <div className='container pt-5 mb-5 pb-5'>
       {mesimdhenesit.length > 0 ? (
           <>
         <h2 className='my-3'>Mesimdhenesit:</h2>
         <Table striped bordered hover className='mb-5 pb-5'>
             <thead>
             <tr>
                 <th>Nr.</th>
                 <th>Emri dhe Mbiemri</th>
                 <th>ID</th>
                 <th>Email</th>
                 <th>Nr. Telefonit</th>
                 <th>Vendbanimi</th>
                 <th>Kualifikimi</th>
                 <th>Opsionet</th>
             </tr>
             </thead>
             <tbody>
             {filteredData.map((item, index) => (
                 <tr key={index}>
                 <td>{index+1}</td>
                 <td>{item.emri_mbiemri}</td>
                 <td>{item.stafiID}</td>
                 <td>{item.email}</td>
                 <td>{item.nrTelefonit}</td>
                 <td>{item.vendbanimi}</td>
                 <td>{item.Kualifikimi}</td>
                 <td>
                     <Button className='btn btn-primary m-1' onClick={() => openNdryshoMesimdhenesinModal(item.ID,item.stafiID,item.emri_mbiemri,item.email,item.fotoPath,item.nrTelefonit,item.vendbanimi,item.Kualifikimi)}>Ndrysho</Button>
                     <Button className='btn btn-danger m-1' onClick={() => openLargoMesimdhenesinModal(item.ID)}>Largo</Button>
                 </td>
                 </tr>
             ))}
             </tbody>
         </Table>
         </>
         ) : (
             <h2 className='my-3'>Nuk ka ndonje Mesimdhenes te regjistruar</h2>
         )}
       </div>
      <ShtoMesimdhenesinModal showModal={showShtoMesimdhenesinModal} closeModal={closeShtoMesimdhenesinModal}/>
      <LargoMesimdhenesinModal showModal={showLargoMesimdhenesinModal} closeModal={closeLargoMesimdhenesinModal} ID={mesimdhenesiID}/>
      <NdryshoMesimdhenesinModal showModal={showNdryshoMesimdhenesinModal} closeModal={closeNdryshoMesimdhenesinModal} mesimdhenesiID={mesimdhenesiID} stafiID={stafiID} emri_mbiemri={emri_mbiemri} email = {email} fotoPath = {fotoPath} nrTelefonit={nrTelefonit} vendbanimi = {vendbanimi} kualifikimi = {kualifikimi}/>
     </div>
    )
}