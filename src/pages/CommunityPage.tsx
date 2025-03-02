import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { GoogleGenerativeAI } from '@google/generative-ai';

interface FoodBank {
  name: string;
  address: string;
  description: string;
  website?: string;
  distance: number;
}

const CommunityPage: React.FC = () => {
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [foodBanks, setFoodBanks] = useState<FoodBank[]>([]);
  const [error, setError] = useState('');
  const [savedFoodBanks, setSavedFoodBanks] = useState<FoodBank[]>([]);

  useEffect(() => {
    // Load saved food banks from localStorage on component mount
    const saved = localStorage.getItem('savedFoodBanks');
    if (saved) {
      setSavedFoodBanks(JSON.parse(saved));
    }
  }, []);

  const toggleSaveFoodBank = (foodBank: FoodBank) => {
    setSavedFoodBanks(prev => {
      const isCurrentlySaved = prev.some(saved => saved.name === foodBank.name && saved.address === foodBank.address);
      let newSavedFoodBanks;
      
      if (isCurrentlySaved) {
        newSavedFoodBanks = prev.filter(saved => !(saved.name === foodBank.name && saved.address === foodBank.address));
      } else {
        newSavedFoodBanks = [...prev, foodBank];
      }

      // Save to localStorage
      localStorage.setItem('savedFoodBanks', JSON.stringify(newSavedFoodBanks));
      return newSavedFoodBanks;
    });
  };

  const isFoodBankSaved = (foodBank: FoodBank) => {
    return savedFoodBanks.some(saved => saved.name === foodBank.name && saved.address === foodBank.address);
  };

  const searchFoodBanks = async () => {
    if (!zipCode.match(/^\d{5}$/)) {
      setError('Please enter a valid 5-digit zip code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      if (!apiKey) throw new Error('API key not found');

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const prompt = `Generate a list of 3 food banks near ZIP code ${zipCode}.
        Return a JSON array with objects having 'name', 'address', 'description', 'website' (optional), and 'distance' (in miles).
        Make the data realistic and relevant to food assistance.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const cleanedText = text.replace(/^```json\s*|```$/g, '').trim();
      const parsedFoodBanks = JSON.parse(cleanedText);

      setFoodBanks(parsedFoodBanks);
    } catch (err) {
      setError('Failed to fetch food banks. Please try again.');
      console.error('Error fetching food banks:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
  <Container fluid className="p-0" style={{ minHeight: '100vh', paddingTop: '120px', maxWidth: '100%' }}>
    <Container className="py-4" style={{ maxWidth: '1400px' }}>
      <h1 style={{ color: '#388E3C', fontFamily: "'Sigmar', serif", textShadow: "4px 4px 4px #aaa", fontSize: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
        Community Resources
      </h1>
      <Row className="justify-content-center mb-4">
        <Col md={8} lg={6}>
          <Form className="d-flex gap-2" onSubmit={(e) => { e.preventDefault(); searchFoodBanks(); }}>
            <Form.Control
              type="text"
              placeholder="Enter ZIP code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              isInvalid={!!error}
            />
            <Button 
              variant="success" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" />
                  <span className="ms-2">Searching...</span>
                </>
              ) : (
                'Search'
              )}
            </Button>
          </Form>
          {error && (
            <div className="text-danger mt-2">{error}</div>
          )}
        </Col>
      </Row>

      <Row className="justify-content-center">
        {foodBanks.map((foodBank, idx) => (
          <Col key={idx} xs={12} sm={6} md={4} lg={4} className="mb-4">
            <Card className="community-card h-100">
              <Card.Body>
                <Card.Title>{foodBank.name}</Card.Title>
                <Card.Text>
                  <p><strong>Distance:</strong> {foodBank.distance.toFixed(1)} miles</p>
                  <p><strong>Address:</strong> {foodBank.address}</p>
                  <p>{foodBank.description}</p>
                  <div className="d-flex gap-2 flex-wrap">
                    {foodBank.website && (
                      <Button
                        variant="outline-success"
                        href={foodBank.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-2"
                      >
                        Visit Website
                      </Button>
                    )}
                    <Button
                      variant={isFoodBankSaved(foodBank) ? "danger" : "success"}
                      onClick={() => toggleSaveFoodBank(foodBank)}
                      className="mb-2"
                    >
                      {isFoodBankSaved(foodBank) ? "Unsave" : "Save"}
                    </Button>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    <style>{`
      .community-card {
        transition: background-color 0.3s ease;
        height: 100%;
      }
      .community-card:hover {
        background-color: #f0f0f0;
      }
      @media (max-width: 576px) {
        h1 {
          font-size: 2rem !important;
        }
        .d-flex.gap-2 {
          flex-direction: column;
        }
        .d-flex.gap-2 > * {
          width: 100%;
        }
      }
    `}</style>
  </Container>
);

};

export default CommunityPage;