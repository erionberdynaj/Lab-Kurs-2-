import '../assets/css/lendet.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {userID,userRole} from '../router'


export default function Lendet(){

    const [userData, setUserData] = useState([]);
        useEffect(() => {
            async function fetchData() {
              try {
                let result = null
                if(userRole !== 'mesimdhenesi'){
                     result = await axios.get(`https://localhost:5001/lenda_nxenesi/${userID}`);
                }else{
                     result = await axios.get(`https://localhost:5001/lenda/lendetEMesimdhenesit/${userID}`);
                }
                const userData = result.data
                setUserData(userData); // set state here
              } catch (error) {
                console.error(error);
              }
            }
          
            fetchData();
          }, []);
    

    const lendetViti1 = userData.filter(obj => obj.viti === 1);
          const lendetViti2 = userData.filter(obj => obj.viti === 2);
          const lendetViti3 = userData.filter(obj => obj.viti === 3);
          
    return(
        <div>
            <div id="lendetContent1" className="d-flex flex-row flex-wrap justify-content-center align-items-center p-5">
                <div id="list1" className="d-flex flex-wrap flex-column m-5">
                    <h1 className="border-bottom">VITI 1</h1>
                    <ol>
                        {lendetViti1.map((obj, index) => (
                            <li key={index}>
                                    <a href={`${window.location.href}/lendaID=${obj.lendaID}`}>{obj.lenda}</a>
                            </li>
                        ))}
                    </ol>

                </div>
                <div id="list2" className="d-flex flex-wrap flex-column m-5">
                    <h1 className="border-bottom">VITI 2</h1>
                    <ol>
                        {lendetViti2.map((obj, index) => (
                                <li key={index}>
                                    <a href={`${window.location.href}/lendaID=${obj.lendaID}`}>{obj.lenda}</a>
                                </li>
                            ))}
                    </ol>
                </div>
                <div id="list3" className="d-flex flex-wrap flex-column m-5">
                    <h1 className="border-bottom">VITI 3</h1>
                    <ol>
                        {lendetViti3.map((obj, index) => (
                                <li key={index}>
                                    <a href={`${window.location.href}/lendaID=${obj.lendaID}`}>{obj.lenda}{obj.emri}</a>
                                </li>
                            ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}