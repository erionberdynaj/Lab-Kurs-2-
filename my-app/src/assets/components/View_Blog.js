import {useParams} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import '../assets/css/view_blog.css'
import ShtoKomentinModal from './Modals/ShtoKomentinModal';
import LargoKomentinModal from './Modals/LargoKomentinModal';
import NdryshoKomentinModal from './Modals/NdryshoKomentinModal';
import { userID,userRole } from '../router';
import { FaTrash,FaEdit } from 'react-icons/fa';

function View_Blog() {
  

    const { blogID } = useParams();

    const [blogPost, setBlogs] = useState([]);
    useEffect(() => {
      async function fetchData() {
        try {
          const result = await axios.get(`https://localhost:5002/blogs/${blogID}`);

          const blogPost = result.data[0]
            
          setBlogs(blogPost); 
          console.log(blogPost)
        } catch (error) {
          console.error(error);
        }
      }
    
      fetchData();
    }, []);
   

    const [comments, setComments] = useState([]);
    useEffect(() => {
      axios.get(`https://localhost:5002/komentet/${blogID}`)
        .then(response => setComments(response.data))
        .catch(error => console.error(error));
    }, []);

    const [showShtoKomentinModal,setShowShtoKomentinModal] = useState(false)
    const [showLargoKomentinModal,setShowLargoKomentinModal] = useState(false)
    const [showNdryshoKomentinModal,setShowNdryshoKomentinModal] = useState(false)
    const [komentiID,setKomentiID] = useState('')
    const [komenti,setKomenti] = useState('')

    const openShtoKomentinModal =()=>{      
        setShowShtoKomentinModal(true)
    }
    const openLargoKomentinModal =(komentiID)=>{   
        setKomentiID(komentiID)   
        setShowLargoKomentinModal(true)
    }
    const openNdryshoKomentinModal =(komentiID,komenti)=>{      
        setKomentiID(komentiID)
        setKomenti(komenti)
        setShowNdryshoKomentinModal(true)
    }
    const closeShtoKomentinModal = () =>{
        setShowShtoKomentinModal(false)
    }
    const closeLargoKomentinModal = () =>{
        setShowLargoKomentinModal(false)
    }
    const closeNdryshoKomentinModal = () =>{
        setShowNdryshoKomentinModal(false)
    }
    const formatDateTime = (dateTimeStr) => {
        const dateTime = new Date(dateTimeStr);
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString();
        return `${date} - ${time}`;
      };
    return (
        <>  
            <br/><br/><br/><br/><br/>
            <div className='section mt-2 1 d-flex flex-wrap flex-row justify-content-center align-items-center'>
                <div className='w-50 mx-5 d-flex justify-content-end'>
                    <img className='rounded w-75' src={blogPost.fotoPath}></img>    
                </div>       
                <div className='w-25 mx-5 p-5 rounded data bg-warning'>
                    <h1 className=' bg-warning'>{blogPost.titulli}</h1>
                    <h5><b>Autori:</b>{blogPost.emri_mbiemri}</h5>
                    <h5><b>Data E Publikimit:</b>{formatDateTime(blogPost.dataPublikimit)}</h5>
                </div>
            </div>
            <br/>
            <div className='d-flex justify-content-center flex-wrap mx-5 border-bottom'>
                <p style={{ maxWidth: '100%', wordWrap: 'break-word' }}>{blogPost.permbatja}</p>
            </div>


            <br></br>

            <div className='comments-container mx-5'>
                <div className='comments-header d-flex justify-content-between align-items-center  pt-5'>
                    <h2 className='comments-heading fs-4'>Komentet:</h2>
                    {userRole == 'nxenesi' ||userRole == 'mesimdhenesi' || userRole == 'administratori' || userRole == 'drejtori'? 
                    <div>
                        <Button className='add-comment-button' onClick={() => openShtoKomentinModal()}>Shto Komentin</Button>
                    </div>
                    :''}
                </div>
                <hr />
                <div className='comments-list' >
                    {comments.map((comment) => (
                    <div className='comment-section bg-light p-3 rounded mb-3' key={comment.blogId}>
                        <h6 className='comment-author fs-6'>{comment.emri_mbiemri}:</h6>
                        <p className='comment-text'>{comment.komenti}</p>
                        <p className='comment-date text-end fs-7'>{formatDateTime(blogPost.dataPublikimit)}</p>
                        {comment.roli == userRole && comment.autoriID == userID?<div className='d-flex flex-row justify-content-end'>
                            <Button className='add-comment-button btn btn-danger  mx-2' onClick={() => openLargoKomentinModal(comment.ID)}><FaTrash /></Button>
                            <Button className='add-comment-button btn btn-primary  mx-2' onClick={() => openNdryshoKomentinModal(comment.ID,comment.komenti)}><FaEdit/></Button>
                        </div>:''}
                    </div>
                    ))}
                </div>
            </div>



            <ShtoKomentinModal showModal={showShtoKomentinModal} closeModal={closeShtoKomentinModal} blogID={blogID} autoriID={userID}/>
            <LargoKomentinModal showModal={showLargoKomentinModal} closeModal={closeLargoKomentinModal} komentiID={komentiID}/>
            <NdryshoKomentinModal showModal={showNdryshoKomentinModal} closeModal={closeNdryshoKomentinModal} komentiID={komentiID} komenti={komenti}/>
        </>
    )
}
export default View_Blog