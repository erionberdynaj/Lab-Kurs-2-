import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import NdryshoNxenesinModal from './NdryshoNxenesinModal';
import ShtoLendenStudentitModal from './ShtoLendenStudentitModal'

export default function DetajetStudentit() {
  const { studentiID } = useParams();
  const [, id] = studentiID.split('=');

  const [studenti, setStudenti] = useState([]);
  const [lendet, setLendet] = useState([]);
  const [mungesat, setMungesat] = useState([]);
  const [notat, setNotat] = useState([]);
  const [veretjet, setVeretjet] = useState([]);

  const [activeTable, setActiveTable] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:5001/nxenesi/${id}`);
        const studenti = result.data[0];
        setStudenti(studenti);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:5001/lenda_nxenesi/${id}`);
        const lendet = result.data;
        setLendet(lendet);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:5001/mungesat/${id}`);
        const mungesat = result.data;
        setMungesat(mungesat);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:5001/notat/${id}`);
        const notat = result.data;
        setNotat(notat);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:5001/veretjet/${id}`);
        const veretjet = result.data;
        setVeretjet(veretjet);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const formatDateTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    const date = dateTime.toLocaleDateString();
    return `${date}`;
  };

  const handleTableButtonClick = (table) => {
    if (activeTable === table) {
      // If the clicked button is already active, hide the table
      setActiveTable(null);
    } else {
      // Otherwise, show the table corresponding to the clicked button
      setActiveTable(table);
    }
  };
  const [showShtoLendenStudentitModal,setShowLendenStudentitModal] = useState(false)
  const [showNdryshoNxenesinModal,setShowNdryshoNxenesinModal] = useState(false)
  const [nxenesiID,setNxenesiID] = useState('')
  const [emri_mbiemri,setEmri_mbiemri] = useState('')
  const [fjalekalimi,setFjalekalimi] = useState('')
  const [email,setEmail] = useState('')
  const [fotoPath,setFotoPath] = useState('')
  const [nrTelefonit,setNrTelefonit] = useState('')
  const [vendbanimi,setVendbanimi] = useState('')
  const [drejtimi,setDrejtimi] = useState('')
  const [emriPrindit,setEmriPrindit] = useState('')
  const [prindiID,setPrindiID] = useState('')
  const [mesimdhenesiID,setMesimdhenesiID] = useState('')

  const openNdryshoNxenesinModal = (nxenesiID,emri_mbiemri,fjalekalimi,email,fotoPath,nrTelefonit,vendbanimi,drejtimi,emriPrindit,prindiID,mesimdhenesiID)=>{
    setNxenesiID(nxenesiID)
    setEmri_mbiemri(emri_mbiemri)
    setFjalekalimi(fjalekalimi)
    setEmail(email)
    setFotoPath(fotoPath)
    setNrTelefonit(nrTelefonit)
    setVendbanimi(vendbanimi)
    setDrejtimi(drejtimi)
    setEmriPrindit(emriPrindit)
    setPrindiID(prindiID)
    setMesimdhenesiID(mesimdhenesiID)
    setShowNdryshoNxenesinModal(true)
  }
  const openShtoLendenStudentitModal = (nxenesiID,emri_mbiemri) =>{
    setEmri_mbiemri(emri_mbiemri)
    setNxenesiID(nxenesiID)
    setShowLendenStudentitModal(true)
  }
  const closeNdryshoNxenesinModal = () =>{
    setShowNdryshoNxenesinModal(false)
  }
  const closeShtoLendenStudentitModal = () =>{
    setShowLendenStudentitModal(false)
  }



  
  return (
    <div>
      <br />
      <br />

      <div className='pt-5 container mb-5'>
        <div className="card mt-4">
          <div className="card-header d-flex flex-row justify-content-between">
            <h3>Te Dhenat e Nxenesit</h3>
            <Button className='m-2 w-25 float-end' onClick={() => openNdryshoNxenesinModal(studenti.nxenesiID,studenti.emri_mbiemri,studenti.fjalekalimi,studenti.email,studenti.fotoPath,studenti.nrTelefonit,studenti.vendbanimi,studenti.drejtimi,studenti.emriPrindit,studenti.prindiID,studenti.mesimdhenesiID)}>Ndrysho te Dhenat</Button>
          </div>
          <div className="card-body d-flex flex-row justify-content-between">
            <p>
              <strong>ID: </strong>
              {studenti.nxenesiID}
            </p>
            <p>
              <strong>Emri dhe Mbiemri: </strong>
              {studenti.emri_mbiemri}
            </p>
            <p>
              <strong>Email: </strong>
              {studenti.email}
            </p>
            <p>
              <strong>Drejtimi: </strong>
              {studenti.drejtimi}
            </p>
            <p>
              <strong>Vendbanimi: </strong>
              {studenti.vendbanimi}
            </p>
            <p>
              <strong>Nr i Telefonit: </strong>
              {studenti.nrTelefonit}
            </p>
            <p>
              <strong>Prindi: </strong>
              {studenti.emriPrindit}
            </p>
          </div>
        </div>
      </div >

      <div className='d-flex flex-row flex-wrap justify-content-center'>
            <Button className="btn btn-primary  m-4 fs-4" onClick={() => handleTableButtonClick('lendet')}>
              Gjenero Lendet
            </Button>
            <Button className=" btn btn-primary  m-4 fs-4" onClick={() => handleTableButtonClick('mungesat')}>
              Gjenero Mungesat
            </Button>
            <Button className="btn btn-primary  m-4 fs-4" onClick={() => handleTableButtonClick('notat')}>
              Gjenero Notat
            </Button>
            <Button className=" btn btn-primary  m-4 fs-4" onClick={() => handleTableButtonClick('veretjet')}>
              Gjenero Veretjet
            </Button>
      </div>
     {/* Ketu kemi lendet */}
          <div className="container">           
            {activeTable === 'lendet' && lendet.length > 0 ? (
              
              <div>
                 <h2 className="text-start">Lendet e Studentit:</h2>
                <Table striped bordered hover className="">
                  <thead>
                    <tr>
                      <th>Nr.</th>
                      <th>Emri i Lendes</th>
                      <th>Viti i Lendes</th>
                      <th>Opsionet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lendet.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.lenda}</td>
                        <td>{item.viti}</td>
                        <td>
                          <Button className="btn btn-danger m-1"  >Largo</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button className="w-100 btn btn-success" onClick={() => openShtoLendenStudentitModal(studenti.ID,studenti.emri_mbiemri)}>Shto nje Lende</Button>
              </div>
            ) : lendet.length === 0 ? (
              <h2 className="my-3">Nxenesi nuk ka ndonje Lende te Regjistruar</h2>
            ) : null}

          </div>
    {/* Ketu kemi mungesat */}
          <div className='container' >
            {activeTable === 'mungesat' && mungesat.length > 0 ? (
              <div>
                <h2 className="text-start">Mungesat e Studentit:</h2>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nr.</th>
                      <th>Me Arsye</th>
                      <th>Pa Arsye</th>
                      <th>Data e Vendosjes</th>
                      <th>Opsionet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mungesat.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.meArsyje}</td>
                        <td>{item.paArsyje}</td>
                        <td>{formatDateTime(item.dataMungesave)}</td>
                        <td>
                          <Button className="btn btn-primary m-1">Ndrysho</Button>
                          <Button className="btn btn-danger m-1">Largo</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : mungesat.length === 0 ? (
              <h2 className="my-3">Nxenesi nuk ka Mungesa te Regjistruara</h2>
            ) : null}
          </div>
    {/* Ketu kemi notat */}      
          <div className="container">           
            {activeTable === 'notat' && notat.length > 0 ? (
              <div>
                <h2 className="text-start">Notat e Studentit:</h2>
                <Table striped bordered hover className="mb-5 pb-5">
                  <thead>
                    <tr>
                      <th>Nr.</th>
                      <th>Lenda</th>
                      <th>Nota Numer</th>
                      <th>Nota Shkronje</th>
                      <th>Mesimdhenesi</th>
                      <th>Data e Vendosjes</th>
                      <th>Opsionet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notat.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.Lenda}</td>
                        <td>{item.notaNumer}</td>
                        <td>{item.notaShkronje}</td>
                        <td>{item.Mesimdhenesi}</td>
                        <td>{formatDateTime(item.dataVendosjes)}</td>
                        <td>
                          <Button className="btn btn-danger m-1">Largo</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : notat.length === 0 ? (
              <h2 className="my-3">Nxenesi nuk ka Nota te Regjistruara</h2>
            ) : null}
          </div>
    {/* Ketu kemi veretjet */}            
          <div className="container">
           
            {activeTable === 'veretjet' && veretjet.length > 0 ? (
              <div>
                <h2 className="text-start">Veretjet e Studentit:</h2>
                <Table striped bordered hover className="mb-5 pb-5 w-100">
                  <thead>
                    <tr>
                      <th>Nr.</th>
                      <th>Komenti</th>
                      <th>Mesimdhenesi</th>
                      <th>Data e Vendosjes</th>                
                      <th>Opsionet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {veretjet.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.komenti}</td>
                        <td>{item.Mesimdhenesi}</td>
                        <td>{formatDateTime(item.dataVendosjes)}</td>
                        <td>
                          <Button className="btn btn-primary m-1">Ndrysho</Button>
                          <Button className="btn btn-danger m-1">Largo</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : veretjet.length === 0 ? (
              <h2 className="my-3">Nxenesi nuk ka Veretje te Regjistruara</h2>
            ) : null}
          </div>

          <br></br><br></br>

          <NdryshoNxenesinModal showModal={showNdryshoNxenesinModal} closeModal={closeNdryshoNxenesinModal} nxenesiID={nxenesiID} emri_mbiemri={emri_mbiemri} fjalekalimi={fjalekalimi} email={email} fotoPath={fotoPath} nrTelefonit={nrTelefonit} vendbanimi={vendbanimi} drejtimi={drejtimi} emriPrindit={emriPrindit} prindiID={prindiID} mesimdhenesiID={mesimdhenesiID} />
          <ShtoLendenStudentitModal showModal={showShtoLendenStudentitModal} closeModal={closeShtoLendenStudentitModal} nxenesiID={nxenesiID} nxenesi={emri_mbiemri} />

    </div>
  );
}
