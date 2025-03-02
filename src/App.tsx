/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import { Container, Navbar, Nav, Button, Row, Col, Card, } from "react-bootstrap";
import CommunityPage from "./pages/CommunityPage";
import StatsPage from "./pages/StatsPage";
import Kitchen from "./components/Kitchen";
import AboutPage from "./pages/AboutPage";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Link, Routes, Navigate } from "react-router-dom";



const MotionCard = motion.div;

function App() {
  return (
    <Router>
      <div style={{ 
        background: 'linear-gradient(to right, #a8d08d, #d9f7be)', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Navbar */}
        <Navbar bg="light" expand="lg" className="p-3 shadow-sm">
          <Container fluid>
            <Navbar.Brand style={{ color: '#388E3C', fontSize: '1.5rem', fontWeight: 'bold' }}>RescueBites</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/" style={{ color: '#388E3C' }} className="nav-link-hover">Home</Nav.Link>
                <Nav.Link as={Link} to="/mealplan" style={{ color: '#388E3C' }} className="nav-link-hover">Meal Plan</Nav.Link>
                <Nav.Link as={Link} to="/community" style={{ color: '#388E3C' }} className="nav-link-hover">Community Resources</Nav.Link>
                <Nav.Link as={Link} to="/about" style={{ color: '#388E3C' }} className="nav-link-hover">About</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Animated Sections */}
        <Routes>
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/" element={<StatsPage />} />
          <Route path="/mealplan" element={<Kitchen />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* Add a default redirect if the route does not exist */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Footer */}
        <footer className="mt-auto py-3" style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          borderTop: '1px solid rgba(0,0,0,0.1)'
        }}>
          <Container>
            <Row className="justify-content-center">
              <Col md={8} className="text-center">
                <p className="mb-0" style={{ color: '#6C757D' }}>Created with ❤️ by RescueBites Team | All Rights Reserved © {new Date().getFullYear()}</p>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
      <style>{
        `.nav-link-hover:hover {
          color: #2E7D32 !important;
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }
        @media (max-width: 768px) {
          .navbar-brand {
            font-size: 1.2rem !important;
          }
        }`
      }</style>
    </Router>
  );
}

export default App;


