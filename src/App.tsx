/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import { Container, Navbar, Nav, Button, Row, Col, Card, } from "react-bootstrap";
import CommunityPage from "./pages/CommunityPage";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Link, Routes, Navigate } from "react-router-dom";


const MotionCard = motion.div;

const sections = [
  { id: "about", title: "What is Food Insecurity?", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet..." },
  { id: "services", title: "Statistics on Food Insecurity", content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore..." },
  { id: "mealplan", title: "MealPlanner", content: "Reach out to us at contact@example.com for more information." },
  { id: "community", title: "Community Resources", content: "hugougouboubougoug" }
];

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
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* Animated Sections */}
        <Routes>
          <Route path="/community" element={<CommunityPage />} />
          
          {/* Default route (home) */}
          <Route path="/" element={
            <div style={{ textAlign: 'center', paddingTop: '100px' }}>

              {/* Main Section */}
        <div style={{ textAlign: 'center', paddingTop: '100px', paddingBottom: '50px' }}>
          <h1 style={{ color: '#388E3C', fontFamily: "'Sigmar', serif", textShadow: "4px 4px 4px #aaa", fontSize: '5rem'}}>Welcome to RescueBites</h1>
          <p style={{ fontSize: '1.25rem', color: '#3A3A3A' }}>Tackling food insecurity one bite at a time</p>
        </div>

        {/* Animated Sections */}
       {sections.map((section, index) => (
        <MotionCard
          key={section.id}
          id={section.id}
          style={{ padding: '40px', backgroundColor: index % 2 === 0 ? '#e8f5e9' : '#c8e6c9', textAlign: 'center' }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Container>
            <h2 style={{ color: '#388E3C', fontFamily: "'Sigmar', serif" }}>{section.title}</h2>
            <p style={{ fontSize: '1.25rem', color: '#3A3A3A' }}>{section.content}</p>
          </Container>
        </MotionCard>
      ))}
            </div>
          } />

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


