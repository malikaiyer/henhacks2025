/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import { Container, Navbar, Nav, Button, Row, Col, Card, } from "react-bootstrap";
import CommunityPage from "./pages/CommunityPage";
import StatsPage from "./pages/StatsPage";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Link, Routes, Navigate } from "react-router-dom";



const MotionCard = motion.div;

function App() {
  return (
    <Router>
      <div style={{ background: 'linear-gradient(to right, #a8d08d, #d9f7be)', minHeight: '100vh' }}>
        
        {/* Navbar */}
        <Navbar bg="light" fixed="top" expand="lg" className="p-3">
          <Navbar.Brand style={{ color: '#388E3C' }}>RescueBites</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {/* Using Link for navigation */}
              <Nav.Link as={Link} to="/" style={{ color: '#388E3C' }}>Home</Nav.Link>
              <Nav.Link as={Link} to="/mealplan" style={{ color: '#388E3C' }}>Meal Plan</Nav.Link>
              <Nav.Link as={Link} to="/community" style={{ color: '#388E3C' }}>Community Resources</Nav.Link>
              <Nav.Link as={Link} to="/about" style={{ color: '#388E3C' }}>About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* Animated Sections */}
        <Routes>
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/" element={<StatsPage />} />
  

          {/* Add a default redirect if the route does not exist */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Footer */}
        <footer style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', textAlign: 'center' }}>
          <p style={{ color: '#6C757D' }}>Created by | All Rights Reserved</p>
        </footer>
       </div>
    </Router>
  );
}

export default App;


