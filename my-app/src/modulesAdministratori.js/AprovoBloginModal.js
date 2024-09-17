import React, { useState,useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AprovoBloginModal = ({ showModal, closeModal,blogID,permbajtja }) => {

    const handleNdryshoClick = async () => {
        try {
           
            const permbatja = document.querySelector('textarea[name="permbajtja"]').value;

            const blogData= {
                permbatja,
                aprovuar:'po',
                ID:blogID
            };
          
            const response = await axios.put('https://localhost:5002/blogs/aprovo', blogData);
            console.log(response.data);
          
            toast.success('Blogi u aprovua me sukses', { autoClose: 1500 });
            setTimeout(() => {
              closeModal();
              window.location.reload();
            }, 2000);
          } catch (error) {
            console.error(error);
          }
          
    }

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Aprovo/Ndrysho Blogin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Modal.Body className='d-flex flex-column m-2 p-2'>
       
        <div className='w-100 d-flex flex-column p-2 fs-5'>
          <label name='permbajtja'>Permbajtja:</label>
          <textarea name='permbajtja' defaultValue={permbajtja}/>
        </div>
        
      </Modal.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Anulo
        </Button>
        <Button variant="primary" onClick={() => handleNdryshoClick()}>
            Aprovo/Ndrysho Blogin
        </Button>
      </Modal.Footer>
      <ToastContainer position='top-center' />
    </Modal>
  );
};

export default AprovoBloginModal;
