import React, {useState,useEffect} from "react";
import axios from "axios";
import {Table,Button} from 'react-bootstrap'
import ShtoAdministratoretModal from "./ShtoAdministratoretModal";
import LargoAdministratoretModal from "./LargoAdministratoretModal";
import NdryshoAdministratoretModal from './NdryshoAdministratoretModal'
import { userRole } from "../router";
export default function Administratoret(){

    const [administratoret, setAdministratoret] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:44335/administratori`);
        const administratoret = result.data;
        setAdministratoret(administratoret);
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

  const filteredData = administratoret.filter((item) =>
    item.stafiID.includes(searchText)
  );

    const [showShtoAdministratoretModal,setShowShtoAdministratoretModal] = useState(false)
    const [showLargoAdministratoretModal,setShowLargoAdministratoretModal] = useState(false)
    const [showNdryshoAdministratoretModal,setShowNdryshoAdministratoretModal] = useState(false)
    const [administratoretID,setAdministratoretID] = useState('')
    const [stafiID,setStafiID] = useState('')
    const [emri_mbiemri,setEmri_mbiemri] = useState('')
    const [email,setEmail] = useState('')
    const [fotoPath,setFotoPath] = useState('')
    const [nrTelefonit,setNrTelefonit] = useState('')
    const [vendbanimi,setVendbanimi] = useState('')
    const [kualifikimi,setKualifikimi] = useState('')

    const openShtoAdministratoretModal = () =>{
        setShowShtoAdministratoretModal(true)
    }
    const openLargoAdministratoretModal = (administratoretID) =>{
        setAdministratoretID(administratoretID)
        setShowLargoAdministratoretModal(true)
    }
    const openNdryshoAdministratoretModal = (administratoretID,stafiID,emri_mbiemri,email,fotoPath,nrTelefonit,vendbanimi,kualifikimi) =>{
        setAdministratoretID(administratoretID)
        setStafiID(stafiID)
        setEmri_mbiemri(emri_mbiemri)
        setEmail(email)
        setFotoPath(fotoPath)
        setNrTelefonit(nrTelefonit)
        setVendbanimi(vendbanimi)
        setKualifikimi(kualifikimi)
        setShowNdryshoAdministratoretModal(true)
    }
    const closeShtoAdministratoretModal = () =>{
        setShowShtoAdministratoretModal(false)
    }
    const closeLargoAdministratoretModal = () =>{
        setShowLargoAdministratoretModal(false)
    }
    const closeNdryshoAdministratoretModal = () =>{
        setShowNdryshoAdministratoretModal(false)
    
    }

    return(
        
        <div>
            <br /><br />
            <div className='text-center pt-5 d-flex flex-row justify-content-center align-items-center'>
                <input type='text' className='form-control w-50 mx-auto' placeholder='Kerko Administratoret ne baze te ID' value={searchText} onChange={handleSearchChange}/>
                <Button className='btn btn-success mx-5 float-end' onClick={() => openShtoAdministratoretModal()}>Shto nje Administrator</Button> 
            </div>
        
       <div className='container pt-5 mb-5 pb-5'>
       {administratoret.length > 0 ? (
           <>
         <h2 className='my-3'>Administratoret:</h2>
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
                     <Button className='btn btn-primary m-1' onClick={() => openNdryshoAdministratoretModal(item.ID,item.stafiID,item.emri_mbiemri,item.email,item.fotoPath,item.nrTelefonit,item.vendbanimi,item.Kualifikimi)}>Ndrysho</Button>
                     <Button className='btn btn-danger m-1' onClick={() => openLargoAdministratoretModal(item.ID)}>Largo</Button>
                 </td>
                 </tr>
             ))}
             </tbody>
         </Table>
         </>
         ) : (
             <h2 className='my-3'>Nuk ka ndonje Administratoret te regjistruar</h2>
         )}
       </div>
      <ShtoAdministratoretModal showModal={showShtoAdministratoretModal} closeModal={closeShtoAdministratoretModal}/>
      <LargoAdministratoretModal showModal={showLargoAdministratoretModal} closeModal={closeLargoAdministratoretModal} ID={administratoretID}/>
      <NdryshoAdministratoretModal showModal={showNdryshoAdministratoretModal} closeModal={closeNdryshoAdministratoretModal} administratoriID={administratoretID} stafiID={stafiID} emri_mbiemri={emri_mbiemri} email = {email} fotoPath = {fotoPath} nrTelefonit={nrTelefonit} vendbanimi = {vendbanimi} kualifikimi = {kualifikimi}/>
     </div>
    )
}