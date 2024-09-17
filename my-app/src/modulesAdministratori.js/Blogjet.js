import React, {useState,useEffect} from "react";
import axios from "axios";
import {Table,Button} from 'react-bootstrap'
import LargoBloginModal from "./LargoBloginModal";
import AprovoBloginModal from "./AprovoBloginModal";

export default function Blogejt(){

    const [blogjetAprovuara, setBlogjetAprovuara] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:5002/aprovuar`);
        const blogjetAprovuara = result.data;
        setBlogjetAprovuara(blogjetAprovuara);
        console.log(blogjetAprovuara)
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const [blogjetJoAprovuara, setBlogjetJoAprovuara] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:5002/JoAprovuar`);
        const blogjetJoAprovuara = result.data;
        setBlogjetJoAprovuara(blogjetJoAprovuara);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const [activeTable, setActiveTable] = useState(null);
const handleTableButtonClick = (table) => {
    if (activeTable === table) {
      // If the clicked button is already active, hide the table
      setActiveTable(null);
    } else {
      // Otherwise, show the table corresponding to the clicked button
      setActiveTable(table);
    }
  };

  const [showLargoBloginModal,setShowLargoBloginModal] = useState(false)
  const [showAprovoBloginModal,setShowAprovoBloginModal] = useState(false)
  const [blogiID,setBlogiID] = useState('')
  const [permbajtja,setPermbajtja] = useState('')

  const openLargoBloginModal = (blogiID) =>{
    setBlogiID(blogiID)
    setShowLargoBloginModal(true)
  }
  const openAprovoBloginModal = (blogiID,permbajtja) =>{
    setPermbajtja(permbajtja)
    setBlogiID(blogiID)
    setShowAprovoBloginModal(true)
  }
  const closeLargoBloginModal = () =>{
    setShowLargoBloginModal(false)
  }
  const closeAprovoBloginModal = () =>{
    setShowAprovoBloginModal(false)
  }
    return(
        
        <div>
            <br /><br />
        <div className='d-flex flex-row flex-wrap justify-content-center'>
            <Button className="btn btn-primary  m-4 fs-4" onClick={() => handleTableButtonClick('aprovuara')}>
              Gjenero Blogjet e Aprovuara
            </Button>
            <Button className=" btn btn-primary  m-4 fs-4" onClick={() => handleTableButtonClick('joaprovuara')}>
              Gjenero Blogjet e Jo-Aprovuara
            </Button>
            
      </div>
       <div className=' m-5 p-5'>
       {activeTable === 'aprovuara' && blogjetAprovuara.length > 0 ? (
           <>
         <h2 className='my-3'>Blogjet e Aprovuara:</h2>
         <Table striped bordered hover className='mb-5 pb-5 w-100'>
          <thead>
            <tr>
              <th>Nr.</th>
              <th>Titulli</th>
              <th>Permbatja</th>
              <th>Foto</th>
              <th>Autori</th>
              <th>Kliket</th>
              <th>Data e Publikimit</th>
              <th>Opsionet</th>
            </tr>
          </thead>
          <tbody>
            {blogjetAprovuara.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.titulli}</td>
                <td>{item.permbatja.substring(0, 60)}</td>
                <td style={{ width: '100px' }}>
                  <img src={item.fotoPath} alt="Foto" style={{ maxWidth: '100%', height: 'auto' }} />
                </td>
                <td>{item.emri_mbiemri}</td>
                <td>{item.kliket}</td>
                <td>{item.dataPublikimit}</td>
                <td>
                  <Button className='btn btn-danger m-1' onClick={() => openLargoBloginModal(item.ID)}>Largo</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

         </>
         ) : (
             <h2 className='my-3'>Nuk ka ndonje Blog te aprovuar te regjistruar</h2>
         )}
       </div>

       <div className=' m-5 p-5'>
       {activeTable === 'joaprovuara' && blogjetJoAprovuara.length > 0 ? (
           <>
         <h2 className='my-3'>Blogjet e Jo-Aprovuara:</h2>
         <Table striped bordered hover className='mb-5 pb-5 w-100'>
             <thead>
             <tr>
                 <th>Nr.</th>
                 <th>Titulli</th>
                 <th>Permbatja</th>
                 <th>Foto</th>
                 <th>Autori</th>
                 <th>Kliket</th>
                 <th>Data e Publikimit</th>
                 <th>Opsionet</th>
             </tr>
             </thead>
             <tbody>
             {blogjetJoAprovuara.map((item, index) => (
                 <tr key={index}>
                 <td>{index+1}</td>
                 <td>{item.titulli}</td>
                 <td>{item.permbatja.substring(0, 60)}</td>
                 <td><img src={item.fotoPath}/></td>
                 <td>{item.emri_mbiemri}</td>
                 <td>{item.kliket}</td>
                 <td>{item.dataPublikimit}</td>
                 <td >
                     <Button className='btn btn-primary m-1' onClick={() => openAprovoBloginModal(item.ID,item.permbatja)}>Aprovo</Button>
                     <Button className='btn btn-danger m-1' onClick={() => openLargoBloginModal(item.ID)}>Largo</Button>
                 </td>
                 </tr>
             ))}
             </tbody>
         </Table>
         </>
         ) : (
             <h2 className='my-3'>Nuk ka ndonje Blog te Jo-Aprovuar te regjistruar</h2>
         )}
       </div>
       <LargoBloginModal showModal={showLargoBloginModal} closeModal={closeLargoBloginModal} blogID={blogiID}/>
       <AprovoBloginModal showModal={showAprovoBloginModal} closeModal={closeAprovoBloginModal} blogID={blogiID} permbajtja={permbajtja}/>

     </div>
    )
}