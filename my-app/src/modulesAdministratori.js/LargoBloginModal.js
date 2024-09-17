import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LargoBloginModal({ showModal, closeModal, blogID }) {
  const handleDeleteItem = async () => {
    try {  
        
      const response2 = await axios.delete(`https://localhost:5002/blogs_tags/${blogID}`);
      const response1 = await axios.delete(`https://localhost:5002/komentet/meBlog/${blogID}`);
      const response = await axios.delete(`https://localhost:5002/blogs/${blogID}`);

      console.log(response.data);

      
      toast.success('Blogi u eliminua me sukses', { autoClose: 1500 });
      setTimeout(() => {
        closeModal();
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Elimino Blogin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        A jeni i sigurt qe deshironi te largoni Blogin?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Anulo
        </Button>
        <Button variant="danger" onClick={handleDeleteItem}>
          Elimino
        </Button>
      </Modal.Footer>
      <ToastContainer position='top-center' />
    </Modal>
  );
}
