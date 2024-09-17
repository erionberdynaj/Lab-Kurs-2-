import React, {useState,useEffect} from "react";
import axios from "axios";
import {Table,Button} from 'react-bootstrap'
import ShtoPrindinModal from './ShtoPrindinModal'
import NdryshoPrindinModal from './NdryshoPrindinModal'
import LargoPrindinModal from './LargoPrindinModal'

export default function Prinderit(){

    const [prinderit, setPrinderit] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:5001/prindi`);
        const prinderit = result.data;
        setPrinderit(prinderit);
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

  const filteredData = prinderit.filter((item) =>
    item.prindiID.includes(searchText)
  );

    const [showShtoPrindinModal,setShowShtoPrindinModal] = useState(false)
    const [showLargoPrindinModal,setShowLargoPrindinModal] = useState(false)
    const [showNdryshoPrindinModal,setShowNdryshoPrindinModal] = useState(false)
    const [ID,setID] = useState('')
    const [prindiID,setPrindiID] = useState('')
    const [emri_mbiemri,setEmri_mbiemri] = useState('')
    const [email,setEmail] = useState('')
    const [fjalekalimi,setFjalekalimi] = useState('')


    const openShtoPrindinModal = () =>{
        setShowShtoPrindinModal(true)
    }
    const openLargoPrindinModal = (ID) =>{
        setID(ID)
        setShowLargoPrindinModal(true)
    }
    const openNdryshoPrindinModal = (ID,prindiID,emri_mbiemri,email,fjalekalimi) =>{
        setID(ID)
        setPrindiID(prindiID)
        setEmri_mbiemri(emri_mbiemri)
        setEmail(email)
        setFjalekalimi(fjalekalimi)
        setShowNdryshoPrindinModal(true)
    }
    const closeShtoPrindinModal = () =>{
        setShowShtoPrindinModal(false)
    }
    const closeLargoPrindinModal = () =>{
        setShowLargoPrindinModal(false)
    }
    const closeNdryshoPrindinModal = () =>{
        setShowNdryshoPrindinModal(false)
    
    }

    return(
        
        <div>
            <br /><br />
            <div className='text-center pt-5 d-flex flex-row justify-content-center align-items-center'>
                <input type='text' className='form-control w-50 mx-auto' placeholder='Kerko Mesimdhenesin ne baze te ID' value={searchText} onChange={handleSearchChange}/>
                <Button className='btn btn-success mx-5 float-end' onClick={() => openShtoPrindinModal()}>Shto nje Prinde</Button> 
            </div>
        
       <div className='container pt-5 mb-5 pb-5'>
       {prinderit.length > 0 ? (
           <>
         <h2 className='my-3'>Prinderit:</h2>
         <Table striped bordered hover className='mb-5 pb-5'>
             <thead>
             <tr>
                 <th>Nr.</th>
                 <th>Emri dhe Mbiemri</th>
                 <th>ID</th>
                 <th>Email</th>
                 <th>Opsionet</th>
             </tr>
             </thead>
             <tbody>
             {filteredData.map((item, index) => (
                 <tr key={index}>
                 <td>{index+1}</td>
                 <td>{item.emri_mbiemri}</td>
                 <td>{item.prindiID}</td>
                 <td>{item.email}</td>
                 <td>
                    
                     <Button className='btn btn-primary m-1' onClick={() => openNdryshoPrindinModal(item.ID,item.prindiID,item.emri_mbiemri,item.email,item.fjalekalimi)}>Ndrysho</Button>
                     <Button className='btn btn-danger m-1' onClick={() => openLargoPrindinModal(item.ID)}>Largo</Button>
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
      <ShtoPrindinModal showModal={showShtoPrindinModal} closeModal={closeShtoPrindinModal}/>
      <LargoPrindinModal showModal={showLargoPrindinModal} closeModal={closeLargoPrindinModal} ID={ID}/>
      <NdryshoPrindinModal showModal={showNdryshoPrindinModal} closeModal={closeNdryshoPrindinModal} ID={ID} prindiID={prindiID} emri_mbiemri={emri_mbiemri} email = {email} fjalekalimi = {fjalekalimi}/>
     </div>
    )
}