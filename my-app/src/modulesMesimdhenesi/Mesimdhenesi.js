import { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/mesimdhenesi.css';
import {userID} from '../router'
import {Link} from 'react-router-dom'


export default function Mesimdhenesi(){
    /* ketu marrim te dhenat e mesimdhenesit aktual*/
    const [userData, setUserData] = useState({});
    useEffect(() => {
      async function fetchData() {
        try {
          const result = await axios.get(`https://localhost:44335/mesimdhenesi/${userID}`);

          const userData = result.data[0]
            
          setUserData(userData); 
        } catch (error) {
          console.error(error);
        }
      }
    
      fetchData();
    }, []);

    /* ketu marrim te bloget e mesimdhenesit aktual */
    const [blogData, setBlogData] = useState({});
    useEffect(() => {
      async function fetchData() {
        try {
          const result = await axios.get(`http://localhost:3002/blogs/${userID}`);
          const blogData = result.data
            
          setBlogData(blogData); 
        } catch (error) {
          console.error(error);
        }
      }
    
      fetchData();
    }, []);

    const blogPosts = [];
    for (let i = 0; i < blogData.length; i++) {
      const blogPost = blogData[i];
      blogPosts.push(
        <div className="blogCard rounded d-flex flex-column flex-wrap m-3" key={blogPost._id}>
          <img className='w-100 rounded' src={'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg'} />
          <h2 className='m-1'>{blogPost.titulli}</h2>
          <hr />
          <p className='m-1'>{blogPost.permbatja.substring(0, 60)}</p>
          <hr />
          <span className='d-flex flex-wrap flex-row justify-content-between'>
            <p className='p-1 mx-2'><b>Autori:</b> {blogPost.autoriID}</p>
            <Link className='p-2 mx-2 readMoreBtn bg-primary' to={`http://localhost:3003/view_blog?id=${blogPost._id}`}>Lexo me Shumë</Link>
          </span>
        </div>
      );
    }
    
    return(
        <div className='d-flex justify-content-center flex-column'>
          <br/><br/><br/>
            <div id="section1" className='d-flex flex-row flex-wrap justify-content-center mt-4'>
                <div className="d-flex flex-row flex-wrap w-50 mt-5 sec2 p-3 rounded">
                    <div id="content1" className=" d-flex flex-column align-items-start justify-content-end w-50">
                    <img src={userData.fotoPath} className="w-50 p-0 mb-2 border rounded" alt='User' />
                    <p><b>Emri dhe Mbiemri:</b>{userData.emri_mbiemri}</p>
                    <p><b>ID:</b>{userData.stafiID}</p>
                    <p><b>Email:</b>{userData.email}</p>
                    </div>
                    <div id="content2" className="d-flex flex-column align-items-start justify-content-end">
                    <h3 className='border-bottom border-dark p-2'>Te Dhenat Personale:</h3>
                    <br />
                    <p><b>Vendbanimi:</b>{userData.vendbanimi}</p>
                    <p><b>Nr.Telefonit:</b>{userData.nrTelefonit}</p>
                    <p><b>Kualifikimi:</b>{userData.Kualifikimi}</p>
                    <p><b>Roli:</b>{userData.roli}</p>
                    </div>
                </div>
            </div>
            <div id="section1" className='d-flex flex-row flex-wrap justify-content-center mt-4 '>
                {userData.roli !== 'mesimdhenes' ? '' : <h1 className='border-bottom w-100 px-5'>Bloget e Mesimdhenesit</h1>}
                
                <div className='d-flex flex-row flex-wrap justify-content-center mt-3 mb-5 pb-5'>
                
                  {userData.roli !== 'mesimdhenes' ? 
                    ( <div id="section2" className="d-flex flex-row flex-wrap justify-content-around align-items-center m-5">
                        
                      </div>
                    ) 
                    : (blogPosts)
                  }


                </div>
            </div>
        </div>
    )
}
