
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import '../assets/css/nxenesi.css';
import {userID,userRole} from '../router'
import { Card, CardBody, CardHeader } from 'reactstrap';
import {Button} from 'react-bootstrap'
export default function Nxenesi() {
  
  const [userData, setUserData] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:5001/${userRole}/${userID}`);
        const userData = result.data[0]
          
        setUserData(userData); 
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, []);

  const [nxenesit, setNxenesit] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        
        const result = await axios.get(`https://localhost:5001/${userRole}/nxenesitEPrindit/${userID}`);
        const nxenesit = result.data;
        setNxenesit(nxenesit);
        console.log(nxenesit)
      } catch (error) {
        console.error(error);
      }
    }
  
    if (userRole == 'prindi') {
      fetchData();
    }
  }, []);
 
  
  return (
    <div className='d-flex justify-content-center flex-column'>
      <br/><br/>
      {userRole == 'nxenesi' ? 
          <div>
          <div id="section1" className='d-flex flex-row flex-wrap justify-content-center mt-4'>
            <div className="d-flex flex-row flex-wrap w-50 mt-5 sec2 p-3 rounded">
              <div id="content1" className=" d-flex flex-column align-items-start justify-content-end w-50">
                <img src={userData.fotoPath} className="w-50 p-0 mb-2 border rounded" alt='User' />
                <p><b>Emri dhe Mbiemri:</b>{userData.emri_mbiemri}</p>
                <p><b>ID:</b>{userData.nxenesiID}</p>
                <p><b>Email:</b>{userData.email}</p>
              </div>
              <div id="content2" className="d-flex flex-column align-items-start justify-content-end">
                <h3 className='border-bottom border-dark p-2'>Te Dhenat Personale:</h3>
                <br />
                <p><b>Vendbanimi:</b>{userData.vendbanimi}</p>
                <p><b>Nr.Telefonit:</b>{userData.nrTelefonit}</p>
                <p><b>Drejtimi:</b>{userData.drejtimi}</p>
                <p><b>Emri i Prindit:</b>{userData.emriPrindit}</p>
              </div>
            </div>
          </div>
          <br /><br /><hr /><br />
          
              <div id="section2" className="d-flex flex-row flex-wrap justify-content-around align-items-center m-5">
                <Link className='p-4 fs-3 rounded bg-primary text-white bold' to={`/nxenesi/${userID}/mungesat`}>Gjenero Mungesat</Link>
                <Link className='p-4 fs-3 rounded bg-primary text-white bold' to={`/nxenesi/${userID}/notat`}>Gjenero Notat</Link>
                <Link className='p-4 fs-3 rounded bg-primary text-white bold' to={`/nxenesi/${userID}/veretjet`}>Gjenero Vërejtjet</Link>
              </div>
          </div>
          :
          <div className='container my-5'>
              <div className='teDhenat my-5'>
                <Card>
                  <CardHeader><h2>Te dhenat e Prindit</h2></CardHeader>
                  <CardBody className='d-flex flex-row flex-wrap justify-content-center fs-5'>
                      <p className='mx-5 px-5'>Emri dhe Mbiemri: <b>{userData.emri_mbiemri}</b></p>
                      <p className='mx-5 px-5'>Email: <b>{userData.email}</b></p>
                      <p className='mx-5 px-5'>ID: <b>{userData.prindiID}</b></p>
                  </CardBody>
                </Card>
              </div>
              <br/>
              <div className='d-flex flex-row flex-wrap justify-content-center align-items-center container p-5'>
                {nxenesit.map((nxenesi) => (
                  <div key={nxenesi.ID} className='d-flex flex-column studentCard flex-wrap mx-5 rounded justify-content-center align-items-center w-25 '>        
                    <div className='data d-flex flex-row flex-wrap '>
                      <img src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png" className='w-100' alt='User'></img>
                      <div className='d-flex flex-row py-2 justify-content-between w-100'>
                        <h6 className='fs-5 d-flex'>{nxenesi.emri_mbiemri}</h6>
                        <p className='d-flex float-end'>{nxenesi.nxenesiID}</p>
                      </div>
                    </div>
                    <div className='buttons d-flex flex-row justify-content-between'>
                    <Link className='vendosBtn  border px-2 bg-primary text-light fs-5 rounded' to={`/nxenesi/${nxenesi.ID}/mungesat`}>Gjenero Mungesat</Link>
                    <Link className='vendosBtn  border px-2 bg-primary text-light fs-5 rounded' to={`/nxenesi/${nxenesi.ID}/notat`}>Gjenero Notat</Link>
                    <Link className='vendosBtn  border px-2 bg-primary text-light fs-5 rounded' to={`/nxenesi/${nxenesi.ID}/veretjet`}>Gjenero Vërejtjet</Link>
                    
                    </div>
                  </div>
                ))}
              </div>
          </div>
          }
      <br /><br /><br />
    </div>
  );
}
