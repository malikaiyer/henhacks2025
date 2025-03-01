import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Kitchen from './components/Kitchen';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="logo">Community Plate</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/kitchen">What's in My Kitchen</Link>
            <Link to="/share">Food Share Hub</Link>
            <Link to="/rescue">Rescue Meals</Link>
            <Link to="/forum">Community Forum</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kitchen" element={<KitchenPage />} />
            <Route path="/share" element={<ShareHub />} />
            <Route path="/rescue" element={<RescueMeals />} />
            <Route path="/forum" element={<CommunityForum />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Placeholder components (to be moved to separate files later)
const Home = () => (
  <div className="home">
    <h1>Welcome to Community Plate</h1>
    <p>Fighting food insecurity together, one plate at a time.</p>
  </div>
);

// Update the KitchenPage component to:
const KitchenPage = () => <Kitchen />;
const ShareHub = () => <div>Food Share Hub Page</div>;
const RescueMeals = () => <div>Rescue Meals Page</div>;
const CommunityForum = () => <div>Community Forum Page</div>;

export default App;
