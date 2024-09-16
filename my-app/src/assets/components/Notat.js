import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';

export default function Notat() {
  const {userID} = useParams()
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:5001/notat/${userID}`);
        const userData = result.data;
        setUserData(userData);
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
  return (
    <>
      <div className='container pt-5 mb-5 pb-5'>
      <br/><br/>
      {userData.length > 0 ? (
          <>
        <h2 className='my-3'>Notat e Nxenesit</h2>
        <Table striped bordered hover className='mb-5 pb-5'>
            <thead>
            <tr>
                <th>Nr.</th>
                <th>Lenda</th>
                <th>Nota Numer</th>
                <th>Nota Shkronje</th>
                <th>Mesimdhenesi</th>
                <th>Data dhe Ora</th>
                
            </tr>
            </thead>
            <tbody>
            {userData.map((item, index) => (
                <tr key={index}>
                <td>{index+1}</td>
                <td>{item.Lenda}</td>
                <td>{item.notaNumer}</td>
                <td>{item.notaShkronje}</td>
                <td>{item.Mesimdhenesi}</td>
                <td>{formatDateTime(item.dataVendosjes)}</td>
                </tr>
            ))}
            </tbody>
        </Table>
        </>
        ) : (
            <h2 className='my-3'>Nxenesi nuk ka Nota te Vendosura</h2>
        )}
      </div>
      <br/> <br/> <br/> <br/><br/> <br/> <br/> 
    </>
  );
}
