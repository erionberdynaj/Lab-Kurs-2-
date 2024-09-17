import React,{useState,useEffect,useMemo} from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/blog.css'
import axios from 'axios'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { userID, userRole } from '../router';
import {Button} from 'react-bootstrap'
import ShtoBloginModal from './Modals/ShtoBloginModal';

export default function Blogs()  {
  const [blogs, setBlogs] = useState([]);
    useEffect(() => {
      async function fetchData() {
        try {
          const result = await axios.get(`https://localhost:5002/aprovuar`);

          const blogs = result.data
            
          setBlogs(blogs); 
        } catch (error) {
          console.error(error);
        }
      }
    
      fetchData();
    }, []);

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
    const [blogs_tags, setBlogs_tags] = useState([]);
    useEffect(() => {
      async function fetchData() {
        try {
          const result = await axios.get(`https://localhost:5002/blogs_tags`);
          const blogs_tags = result.data          
          setBlogs_tags(blogs_tags); 
        } catch (error) {
          console.error(error);
        }
      }
    
      fetchData();
    }, []);

    const [clickedTags, setClickedTags] = useState([]);

    const handleTagClick = (tagId) => {
      if (clickedTags.includes(tagId)) {
        setClickedTags(clickedTags.filter(ID => ID !== tagId));
      } else {
        setClickedTags([...clickedTags, tagId]);
      }
    };
  
    const filteredBlogPosts = useMemo(() => {
      if (clickedTags.length === 0 || tags.length === 0 || blogs.length === 0 || blogs_tags.length === 0) {
        return blogs;
      }
    
      const filteredBlogIds = blogs_tags
        .filter((bt) => clickedTags.includes(bt.tagID))
        .map((bt) => bt.blogID);
    
      return blogs.filter((post) => filteredBlogIds.includes(post.ID));
    }, [clickedTags, tags, blogs, blogs_tags]);
    

  const handleShtoKliket = async (kliket,ID) => {
    kliket++
    try {

        const BlogData = {
           kliket,
           ID
        };
        const response = await axios.put('https://localhost:5002/blogs/shtoKliket', BlogData);
        console.log(response.data);
      
      } catch (error) {
        console.error(error);
      }
      
}
  const [showShtoBloginModal,setShowShtoBloginModal] = useState(false)

  const openShtoBloginModal = () =>{
    setShowShtoBloginModal(true)
  }
  const closeShtoBloginModal = () =>{
    setShowShtoBloginModal(false)
  }
  return (
    <div >
      <br></br><br></br><br></br><br></br>
      {userRole !== 'vizitori' && userRole !== 'prindi' && userRole !== 'nxenesi'? <div className='d-flex flex-row flex-wrap justify-content-end mx-3'>
        <Button className='btn btn-success fs-4' onClick={() => openShtoBloginModal()}>Shto nje Blog</Button>
      </div>:''}

      <div id='section 2' className='d-flex flex-row flex-wrap'>
        <h3 className='p-2'>Filtro:</h3>
        {tags.map(tag => (
          <div key={tag.ID}>
            <p
              id="tagBtn"
              className={`p-2 m-1 fs-3 oneTag d-flex flex-row flex-wrap justify-content-center align-items-center ${clickedTags.includes(tag.ID) ? 'active' : ''}`}
              onClick={() => handleTagClick(tag.ID)}
            >
              {clickedTags.includes(tag.ID) && (
                <span className='p-0 mb-1' id='ikona'>
                  <AiOutlineCloseCircle />
                </span>
              )}
              {tag.emri}
            </p>
          </div>
        ))}
      </div>
      <hr />
      <div id='section3' className='mt-5 flex-row container'>
  <div className="row p-8" style={{ display: 'flex', flexWrap: 'wrap' }}>
    {filteredBlogPosts.map(blogPost => (
      <div className="col-md-4" key={blogPost._id} style={{ display: 'flex', marginBottom: '20px' }}>
        <div className="card aspect-ratio--1x1" style={{ width: '100%' }}>
          <img
            src={blogPost.fotoPath}
            className="card-img-top"
            alt="..."
            style={{ objectFit: 'cover', height: '100%' }}
          />
          <div className="card-body">
            <h5 className="card-title">{blogPost.titulli}</h5>
            <br></br>
            <h6 className="card-subtitle mb-2">Autori: {blogPost.emri_mbiemri}</h6>
            <p className="card-text m-1 fs-5">{blogPost.permbatja.substring(0, 100)} ...</p>
            <br></br>
            {userRole === 'vizitori' &&
              <Link className='btn p-2 mx-2 readMoreBtn bg-primary' to={`/${userRole}/blogs/view_blog/${blogPost.ID}`} onClick={() => handleShtoKliket(blogPost.kliket)}>Lexo me Shumë</Link>}
            {userRole !== 'vizitori' &&
              <Link className='btn p-2 mx-2 readMoreBtn bg-primary' to={`/${userRole}/${userID}/blogs/view_blog/${blogPost.ID}`} onClick={() => handleShtoKliket(blogPost.kliket, blogPost.ID)}>Lexo me Shumë</Link>}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>






      <ShtoBloginModal showModal={showShtoBloginModal} closeModal={closeShtoBloginModal}/>
    </div>
  );
};

