import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Kitchen from './components/Kitchen';

function App() {
  return (
    <Router>
      <div style={{ background: 'linear-gradient(to right,rgb(187, 163, 239),rgb(208, 207, 212))', minHeight: '100vh' }}>
        
        {/* Navbar */}
        <Navbar bg="light" fixed="top" expand="lg" className="p-3">
          <Navbar.Brand>RescueBites</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {/* Using Link for navigation */}
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/mealplan">Meal Plan</Nav.Link>
              <Nav.Link as={Link} to="/community">Community Resources</Nav.Link>
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
          <h1 style={{ color: '#E91E63', fontFamily: "'Nunito', sans-serif" }}>Welcome to RescueBites</h1>
          <p style={{ fontSize: '1.25rem', color: '#3A3A3A' }}>Tackling food insecurity one bite at a time</p>
        </div>

        {/* Animated Sections */}
       {sections.map((section, index) => (
        <MotionCard
          key={section.id}
          id={section.id}
          style={{ padding: '40px', backgroundColor: index % 2 === 0 ? 'white' : '#F8F9FA', textAlign: 'center' }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Container>
            <h2 style={{ color: '#E91E63' }}>{section.title}</h2>
            <p style={{ fontSize: '1.25rem', color: '#3A3A3A' }}>{section.content}</p>
          </Container>
        </MotionCard>
      ))}
            </div>
          } />
        </Routes>

        {/* Footer */}
        <footer style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', textAlign: 'center' }}>
          <p style={{ color: '#6C757D' }}>Created by | All Rights Reserved</p>
        </footer>
        </Router>
  );
}

export default App;


