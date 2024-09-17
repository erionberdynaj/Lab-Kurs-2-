import React, { useState } from 'react';
import '../assets/css/layout.css';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa';
import { userID, userRole } from '../router';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const NxenesiLayout = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const backgroundColor = userRole === 'mesimdhenesi' ? '#0073ff' : '#ff7300';

  return (
    <div>
      <Navbar className='container-fluid' style={{ backgroundColor }} light expand="md">
        <NavbarBrand href="/">
          <img src={require('../../src/assets/images/logo.png')} alt='logo' className="navbar-brand" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink className='link' tag={Link} to={`/${userRole}/${userID}`}>Profili</NavLink>
            </NavItem>
            {userRole === 'mesimdhenesi' && (
              <NavItem>
                <NavLink className='link' tag={Link} to={`http://localhost:3006/mesimdhenesi/${userID}/studentet`}>Studentët</NavLink>
              </NavItem>
            )}
            {userRole === 'nxenesi' && (
              <NavItem>
                <NavLink className='link' tag={Link} to={`/${userRole}/${userID}/lendet`}>Lëndët</NavLink>
              </NavItem>
            )}
            <NavItem>
              <NavLink className='link' tag={Link} to={`http://localhost:3003/${userRole}/${userID}/blogs`}>Blogu</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='link' tag={Link} to={`http://localhost:3005/${userRole}/${userID}/grup`}>Grupi</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='link' tag={Link} to={`http://localhost:3005/${userRole}/${userID}/member`}>Anëtarët</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='link' tag={Link} to={`http://localhost:3005/${userRole}/${userID}/liga`}>Liga</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='link' tag={Link} to={`http://localhost:3005/${userRole}/${userID}/ekipi`}>Ekipi</NavLink>
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
        </Collapse>
      </Navbar>
      <Outlet />
      <footer style={{ backgroundColor: "#222831", padding: "40px 0", color: "#EEEEEE", fontFamily: "Arial, sans-serif" }}>
        <div className="container text-center">
          <section className="mb-4">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px", color: "#F05454" }}>E-Shkolla</h2>
                <p style={{ fontSize: "1.2rem", lineHeight: "1.6", marginBottom: "30px" }}>
                  Duke ofruar arsim cilësor për të ardhmen tuaj. Ne synojmë të pajisim të rinjtë me njohuri dhe aftësi të avancuara që të përparojnë në botën teknologjike të sotme.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-4">
            <div className="row">
              <div className="col-md-3">
                <h5 style={{ color: "#EEEEEE", fontSize: "1.2rem", marginBottom: "15px" }}>Linqe të Shpejta</h5>
                <ul style={{ listStyleType: "none", padding: "0" }}>
                  <li><a href="/" style={{ color: "#EEEEEE", textDecoration: "none" }}>Kreu</a></li>
                  <li><a href="/about" style={{ color: "#EEEEEE", textDecoration: "none" }}>Rreth Nesh</a></li>
                  <li><a href="/courses" style={{ color: "#EEEEEE", textDecoration: "none" }}>Kursët</a></li>
                  <li><a href="/contact" style={{ color: "#EEEEEE", textDecoration: "none" }}>Kontakti</a></li>
                </ul>
              </div>
              <div className="col-md-3">
                <h5 style={{ color: "#EEEEEE", fontSize: "1.2rem", marginBottom: "15px" }}>Burime</h5>
                <ul style={{ listStyleType: "none", padding: "0" }}>
                  <li><a href="/blog" style={{ color: "#EEEEEE", textDecoration: "none" }}>Blogu</a></li>
                  <li><a href="/faq" style={{ color: "#EEEEEE", textDecoration: "none" }}>FAQs</a></li>
                  <li><a href="/events" style={{ color: "#EEEEEE", textDecoration: "none" }}>Ngjarjet</a></li>
                  <li><a href="/support" style={{ color: "#EEEEEE", textDecoration: "none" }}>Mbështetje</a></li>
                </ul>
              </div>
              <div className="col-md-6">
                <h5 style={{ color: "#EEEEEE", fontSize: "1.2rem", marginBottom: "15px" }}>Abonohu në buletinin tonë</h5>
                <form>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Shkruani email-in tuaj"
                    style={{ width: "80%", display: "inline-block", marginRight: "10px", padding: "10px" }}
                  />
                  <button type="submit" className="btn" style={{ backgroundColor: "#F05454", color: "#EEEEEE", padding: "10px 20px" }}>
                    Abonohu
                  </button>
                </form>
              </div>
            </div>
          </section>

          <hr style={{ borderColor: "#393E46", margin: "20px 0" }} />

          <section className="social-icons mb-4">
            <a href="/" style={{ margin: "0 15px", color: "#F05454", fontSize: "1.5rem" }}><FaInstagram /></a>
            <a href="/" style={{ margin: "0 15px", color: "#F05454", fontSize: "1.5rem" }}><FaTwitter /></a>
            <a href="/" style={{ margin: "0 15px", color: "#F05454", fontSize: "1.5rem" }}><FaLinkedin /></a>
            <a href="/" style={{ margin: "0 15px", color: "#F05454", fontSize: "1.5rem" }}><FaYoutube /></a>
          </section>
        </div>

        <div className="text-center py-3" style={{ backgroundColor: "#0F3460", color: "#EEEEEE", fontSize: "0.9rem" }}>
          © 2024 E-Shkolla. Të gjitha të drejtat të rezervuara. | <a href="/privacy" style={{ color: "#F05454", textDecoration: "none" }}>Politika e Privatësisë</a>
        </div>
      </footer>
    </div>
  );
}

export default NxenesiLayout;
