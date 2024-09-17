import React, { useState } from 'react';
import '../assets/css/layout.css';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import {userID,userRole} from '../router'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const BlogLayout = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      
       <Navbar className={`container-fluid float-end  ${userRole == 'mesimdhenesi' || userRole == 'administratori' ||userRole == 'drejtori' ? 'navbar-blue' : 'navbar-orange'}`} color="light" light expand="md">
       <NavbarBrand href="/">
       <img src={require('../../src/assets/images/logo.png')} alt='#' className="navbar-brand" />
          </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar className='w-100 float-end'>
                    {userRole == 'vizitori' ? 
                    <div className='d-flex flex-row flex-wrap ms-auto mx-4'>
                      <Nav className="ms-auto " navbar>
                        <NavItem>
                        <NavLink className='link' tag={Link} to="http://localhost:3001">Faqja Kryesore</NavLink>                       
                        </NavItem>
                        <NavItem>
                        <NavLink className='link' tag={Link} to="http://localhost:3001/rrethNesh">Rreth Nesh</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink className='link' tag={Link} to={`http://localhost:3003/${userRole}/blogs`}>Blogi</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink className='link' tag={Link} to="http://localhost:3001/kontakti">Kontakti</NavLink>
                        </NavItem>
                      </Nav>
                      <Nav navbar>
                          <NavItem>
                          <NavLink className='link' tag={Link} to="http://localhost:3001/identifikohu">Identifikohu</NavLink>
                          </NavItem>
                      </Nav>
                    </div>:''}


                    {userRole == 'nxenesi' || userRole == 'prindi'?
                    <div className='d-flex flex-row flex-wrap ms-auto mx-4'>
                      <Nav className="ms-auto" navbar>
                        <NavItem>
                          <NavLink className='link' tag={Link} to={`http://localhost:3005/${userRole}/${userID}`}>Profili</NavLink>
                        </NavItem>
                        {userRole == 'mesimdhenesi' ? (
                          <NavItem >
                            <NavLink className='link' tag={Link} to={`http://localhost:3006/mesimdhenesi/${userID}/studentet`}>Studentet</NavLink>
                          </NavItem>
                        ) : null}
                        {userRole == 'nxenesi' ?  <NavItem>
                          <NavLink className='link' tag={Link} to={`http://localhost:3005/${userRole}/${userID}/lendet`}>Lendet</NavLink>
                        </NavItem>:''}
                        <NavItem>
                          <NavLink className='link' tag={Link} to={`http://localhost:3003/${userRole}/${userID}/blogs`}>Blogi</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink className='link' tag={Link} to={`http://localhost:3007/${userRole}/${userID}/librat`}>Libraria</NavLink>
                        </NavItem>
                      </Nav>
                      <Nav navbar>
                        <NavItem>
                          <NavLink className='link' tag={Link} to="http://localhost:3001">Dil</NavLink>
                        </NavItem>
                      </Nav>
                    </div>:''}



                    {userRole == 'mesimdhenesi' || userRole == 'administratori' || userRole =='drejtori' ? 
                    <div className='d-flex flex-row flex-wrap ms-auto mx-4'>
                      <Nav className="ms-auto" navbar>
                        <NavItem>
                          <NavLink className='link' tag={Link} to={`http://localhost:3006/${userRole}/${userID}`}>Profili</NavLink>
                        </NavItem>
                      
                        {userRole == 'mesimdhenesi' ? 
                        (
                          <NavItem>
                            <NavLink className='link' tag={Link} to={`http://localhost:3006/${userRole}/${userID}/studentet`}>Studentet</NavLink>
                          </NavItem>
                        ):
                        (
                          
                          <div className='d-flex flex-row'>
                            <NavItem>
                                <NavLink className='link' tag={Link} to={`http://localhost:3006/${userRole}/${userID}/lendet`}>Lendet</NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink className='link' tag={Link} to={`http://localhost:3006/${userRole}/${userID}/mesimdhenesit`}>Mesimdhenesit</NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink className='link' tag={Link} to={`http://localhost:3006/${userRole}/${userID}/administrator_studentet`}>Studentet</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='link' tag={Link} to={`http://localhost:3006/${userRole}/${userID}/menaxhoBlogjet`}>Menagjo Blogjet</NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink className='link' tag={Link} to={`http://localhost:3006/${userRole}/${userID}/menaxhoLibrarine`}>Menagjo Librarine</NavLink>
                          </NavItem>
                          </div>
                        )}
                        {userRole == 'drejtori'?
                        <div className='d-flex flex-row'>
                            <NavItem>
                                <NavLink className='link' tag={Link} to={`http://localhost:3006/${userRole}/${userID}/administratoret`}>Administratoret</NavLink>
                            </NavItem>
                          </div>
                          :''}
                          
                          <NavItem>
                            <NavLink className='link' tag={Link} to={`http://localhost:3003/${userRole}/${userID}/blogs`}>Blogi</NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink className='link' tag={Link} to={`http://localhost:3007/${userRole}/${userID}/librat`}>Libraria</NavLink>
                          </NavItem>
                          
                        </Nav>
                        <Nav navbar>
                          <NavItem>
                            <NavLink className='link' tag={Link} to="http://localhost:3001">Dil</NavLink>
                          </NavItem>
                        </Nav>
                    </div>:''}
                </Collapse>
        </Navbar>
      <Outlet/>
      <footer className="text-center text-lg-start text-white">
    <div className="container p-4 pb-0">
      <section className="text-center">
        <div className="row">
          <div className="">
            <h4 className='titulli'>Gjimnazi Bedri Pejani</h4>

            <p className='paragraph'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae modi cum ipsam ad, illo possimus laborum ut
              reiciendis obcaecati. Ducimus, quas. Corrupti, pariatur eaque?
              Reiciendis assumenda iusto sapiente inventore animi?Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae modi cum ipsam ad, illo possimus laborum ut
              reiciendis obcaecati. Ducimus, quas. Corrupti, pariatur eaque?
              Reiciendis assumenda iusto sapiente inventore animi?
            </p>
          </div>
        </div>
      </section>

      <hr className="mb-2" />
      <section className="mb-0 text-center">
  <a className="btn btn-outline-dark btn-floating m-2" href="/" role="button">
    <FaFacebook />
  </a>

  <a className="btn btn-outline-dark btn-floating m-2" href="/" role="button">
    <FaTwitter />
  </a>

  <a className="btn btn-outline-dark btn-floating m-2" href="/" role="button">
    <FaLinkedinIn />
  </a>

  <a className="btn btn-outline-dark btn-floating m-2" href="/" role="button">
    <FaGithub />
  </a>
</section>

    </div>
    <hr className="mb-0" />
    <div className="text-center p-2">
      © 2023 Copyright: All Rights Reserved
      <a className="text-white" href="https://mdbootstrap.com/"> </a>
    </div>
  </footer>
    </div>
  );
}

export default BlogLayout;