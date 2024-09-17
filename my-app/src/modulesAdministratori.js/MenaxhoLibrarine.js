import React, {useState,useEffect} from "react";
import axios from "axios";
import {  Button,Table } from 'react-bootstrap';
import ShtoLibrinModal from "./ShtoLibrinModal";
import NdryshoLibrinModal from "./NdryshoLibrinModal";
import LargoLibrinModal from "./LargoLibrinModal";

export default function Blogejt(){

    const [librat, setLibrat] = useState([]);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const result = await axios.get(`http://localhost:3002/`);
          const librat = result.data;
          setLibrat(librat);
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

  const filteredData = librat.filter((item) =>
    item.titulli.includes(searchText)
  );


  const [showShtoLibrinModal,setShowShtoLibrinModal] = useState(false)
  const [showNdryshoLibrinModal,setNdryshoLibrinModal] = useState(false)
  const [showLargoLibrinModal,setLargoLibrinModal] = useState(false)
  const [libriID,setLibriID] = useState('')
  const [titulli,setTitulli] = useState('')
  const [autori,setAutori] = useState('')
  const [linku,setLinku] = useState('')
  const [fotoPath,setFotoPath] = useState('')
  const [isbn,setIsbn] = useState('')
  const [dataPublikimit,setDataPublikimit] = useState('')




  const openShtoLibrinModal=()=>{
    setShowShtoLibrinModal(true)
  }
  const openNdryshoLibrinModal = (libriID,titulli,autori,linku,fotoPath,isbn,dataPublikimit) =>{
    setTitulli(titulli)
    setAutori(autori)
    setLinku(linku)
    setFotoPath(fotoPath)
    setIsbn(isbn)
    setDataPublikimit(dataPublikimit)
    setLibriID(libriID)
    setNdryshoLibrinModal(true)
  }
  const openLargoLibrinModal = (libriID) =>{
    setLibriID(libriID)
    setLargoLibrinModal(true)
  }
  const closeShtoLibrinModal = () =>{
    setShowShtoLibrinModal(false)
  }
  const closeNdryshoLibrinModal = () =>{
    setNdryshoLibrinModal(false)
  }
  const closeLargoLibrinModal = () =>{
    setLargoLibrinModal(false)
  }


  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
    return(
        
        <div>
             <br /><br />
            <div className='text-center pt-5 d-flex flex-row justify-content-center align-items-center'>
                <input type='text' className='form-control w-50 mx-auto' placeholder='Kerko Librin me ane te Titullit' value={searchText} onChange={handleSearchChange}/>
                <Button className='btn btn-success mx-5 float-end' onClick={() => openShtoLibrinModal()}>Shto nje Liber</Button> 
            </div>
       <div className=' m-5 p-5'>
       {librat.length > 0 ? (
           <>
                    <h2 className='my-3'>Librat:</h2>
                    <Table striped bordered hover className='mb-5 pb-5 w-100 fs-5'>
              <thead>
                <tr>
                  <th>Nr.</th>
                  <th>Titulli</th>
                  <th>Autori</th>
                  <th>Foto</th>
                  <th>Kliket</th>
                  <th>ISBN</th>
                  <th>Linku</th>
                  <th>Data e Publikimit</th>
                  <th>Opsionet</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.titulli}</td>
                    <td>{item.autori}</td>
                    <td>
                      <img
                        src={item.fotoPath}
                        alt="img"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>{item.kliket}</td>
                    <td>{item.isbn}</td>
                    <td>{item.linku}</td>
                    <td>{formatDate(item.dataPublikimit)}</td>
                    <td>
                      <Button
                        className='btn btn-primary m-1'
                        onClick={() =>
                          openNdryshoLibrinModal(
                            item._id,
                            item.titulli,
                            item.autori,
                            item.linku,
                            item.fotoPath,
                            item.isbn,
                            item.dataPublikimit
                          )
                        }
                      >
                        Ndrysho
                      </Button>
                      <Button
                        className='btn btn-danger m-1'
                        onClick={() => openLargoLibrinModal(item._id)}
                      >
                        Largo
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

         </>
         ) : (
             <h2 className='my-3'>Nuk ka ndonje Liber te regjistruar</h2>
         )}
       </div>
            <ShtoLibrinModal showModal={showShtoLibrinModal} closeModal={closeShtoLibrinModal} />
            <NdryshoLibrinModal showModal={showNdryshoLibrinModal} closeModal={closeNdryshoLibrinModal} titulli={titulli} autori={autori}  fotoPath={fotoPath} isbn={isbn} linku={linku} dataPublikimit={dataPublikimit} _id={libriID}/>
            <LargoLibrinModal showModal={showLargoLibrinModal} closeModal={closeLargoLibrinModal} _id={libriID} />
     </div>
    )
}