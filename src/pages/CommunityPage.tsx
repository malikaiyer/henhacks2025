import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";

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

  const searchFoodBanks = async () => {
    if (!zipCode.match(/^\d{5}$/)) {
      setError('Please enter a valid 5-digit zip code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:4000/api/foodbanks?zipCode=${zipCode}`);
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setFoodBanks(data);
    } catch (err) {
      setError('Failed to fetch food banks. Please try again.');
      console.error('Error fetching food banks:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
  <Container fluid className="p-0" style={{ minHeight: '100vh', paddingTop: '76px' }}>
    <Container>
      <h1 style={{ color: '#388E3C', fontFamily: "'Sigmar', serif", textShadow: "4px 4px 4px #aaa", fontSize: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
        Community Resources
      </h1>
      <Row className="justify-content-center mb-4">
        <Col md={6}>
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
          <Col key={idx} md={4} className="mb-4">
            <Card className="community-card h-100">
              <Card.Body>
                <Card.Title>{foodBank.name}</Card.Title>
                <Card.Text>
                  <p><strong>Distance:</strong> {foodBank.distance.toFixed(1)} miles</p>
                  <p><strong>Address:</strong> {foodBank.address}</p>
                  <p>{foodBank.description}</p>
                  {foodBank.website && (
                    <Button
                      variant="outline-success"
                      href={foodBank.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                    </Button>
                  )}
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
    `}</style>
  </Container>
);

};

export default CommunityPage;