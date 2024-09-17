import React, { useState,useEffect} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { userRole,userID } from '../../router';
import axios from 'axios';

const ShtoBloginModal = ({ showModal, closeModal}) => {
  
  const handleShtoBlogin = async () => {
    try {
        const permbatja  = document.querySelector('textarea[name="permbatja"]').value;
        const titulli  = document.querySelector('input[name="titulli"]').value;
        const fotoPath  = document.querySelector('input[name="foto"]').value;
        var postedBlogID;
        const BlogData = {
        titulli,
        permbatja,
        dataPublikimit: new Date().toISOString(),
        kliket: 0,
        fotoPath,
        aprovuar: 'jo',
        autoriID: userID
        };

        try {
        const response = await axios.post('https://localhost:5002/blogs/', BlogData);
        postedBlogID = response.data.ID; 
        } catch (error) {
        console.error(error);
        }

          

        for (const tagID of selectedTags) {
            const blogTags = {
              blogID: postedBlogID,
              tagID
            };
            const response2 = await axios.post('https://localhost:5002/blogs_tags/', blogTags);
          }

        toast.success('Blogi u shtua me sukses', { autoClose: 1500 });
        setTimeout(() => {
          closeModal();
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error(error);
      }
      
    }
    
const [tags, setTags] = useState([]);
    useEffect(() => {
      async function fetchData() {
        try {
          const result = await axios.get(`https://localhost:5002/tags`);

          const tags = result.data
            
          setTags(tags); 
        } catch (error) {
          console.error(error);
        }
      }
    
      fetchData();
    }, []);
    const [selectedTags, setSelectedTags] = useState([]);

    // Handler for when a checkbox is clicked
    const handleTagChange = (tagId) => {
      if (selectedTags.includes(tagId)) {
        // Remove the tag if it was previously selected
        setSelectedTags(selectedTags.filter((tag) => tag !== tagId));
      } else {
        // Add the tag if it was not previously selected
        setSelectedTags([...selectedTags, tagId]);
      }
    };

    return (
    <Modal show={showModal} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Shto Blogin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className='w-100 d-flex flex-column p-2 fs-5'>
        <label name="titulli">Titulli:</label>
        <input type='text' name='titulli'></input>
      </div>
      <div className='w-100 d-flex flex-column p-2 fs-5'>
        <label name='permbatja'>Permbatja</label>
        <textarea name='permbatja' rows={5}></textarea>
      </div>

      <div className='w-100 d-flex flex-column p-2 fs-5'>
        <label name='foto'>Foto:</label>
        <input type='link' name='foto'></input>
      </div>
      <div className='d-flex flex-row flex-wrap m-1 p-2'>
        {tags.map((tag) => (
        <div key={tag.id} className='fs-4 m-2'>
          <label>
            <input
              type="checkbox"
              checked={selectedTags.includes(tag.ID)}
              onChange={() => handleTagChange(tag.ID)}
            />
            <span className='mx-1'>{tag.emri}</span>
          </label>
        </div>
      ))}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeModal}>
          Anulo
        </Button>
        <Button variant='primary' onClick={handleShtoBlogin}>
          Shto Blogin
        </Button>
      </Modal.Footer>
      <ToastContainer position='top-center' />
    </Modal>
  );
};

export default ShtoBloginModal;
