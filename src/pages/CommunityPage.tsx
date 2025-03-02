import React, { useState} from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { GoogleGenerativeAI } from '@google/generative-ai';

interface FoodBank {
  name: string;
  address: string;
  description: string;
  website?: string;
  distance: number;
  reviews?: { text: string; date: string; }[];
}

const CommunityPage: React.FC = () => {
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [foodBanks, setFoodBanks] = useState<FoodBank[]>([]);
  const [error, setError] = useState('');
  const [selectedFoodBank, setSelectedFoodBank] = useState<FoodBank | null>(null);
  const [reviewText, setReviewText] = useState('');



  const handleSaveReview = () => {
    if (!selectedFoodBank || !reviewText.trim()) return;

    const newReview = {
      text: reviewText.trim(),
      date: new Date().toISOString()
    };

    const updatedFoodBanks = foodBanks.map(fb => {
      if (fb.name === selectedFoodBank.name && fb.address === selectedFoodBank.address) {
        return {
          ...fb,
          reviews: [...(fb.reviews || []), newReview]
        };
      }
      return fb;
    });

    setFoodBanks(updatedFoodBanks);
    setReviewText('');
    setSelectedFoodBank(null);

    // Update localStorage
    const savedBanks = JSON.parse(localStorage.getItem('savedFoodBanks') || '[]');
    const updatedSavedBanks = savedBanks.map((fb: FoodBank) => {
      if (fb.name === selectedFoodBank.name && fb.address === selectedFoodBank.address) {
        return {
          ...fb,
          reviews: [...(fb.reviews || []), newReview]
        };
      }
      return fb;
    });
    localStorage.setItem('savedFoodBanks', JSON.stringify(updatedSavedBanks));
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
    <Container fluid className="p-0" style={{ minHeight: '100vh', maxWidth: '100%' }}>
      <Container className="py-3" style={{ maxWidth: '1400px' }}>
        <h1 style={{ color: '#388E3C', fontFamily: "'Sigmar', serif", textShadow: "4px 4px 4px #aaa", fontSize: '2.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          Community Resources
        </h1>
        <Row className="justify-content-center mb-3">
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

                      <OverlayTrigger
                        trigger={["hover", "focus"]}
                        placement="top"
                        overlay={
                          <Popover>
                            <Popover.Header>Reviews ({foodBank.reviews?.length || 0})</Popover.Header>
                            <Popover.Body>
                              {foodBank.reviews && foodBank.reviews.length > 0 ? (
                                <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                                  {foodBank.reviews.map((review, index) => (
                                    <div key={index} className="mb-2">
                                      <small className="text-muted">
                                        {new Date(review.date).toLocaleDateString()}
                                      </small>
                                      <p className="mb-0">{review.text}</p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="mb-0">No reviews yet</p>
                              )}
                            </Popover.Body>
                          </Popover>
                        }
                      >
                        <Button
                          variant="info"
                          onClick={() => setSelectedFoodBank(foodBank)}
                          className="mb-2"
                        >
                          Review ({foodBank.reviews?.length || 0})
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {/* Review Modal */}
      <Modal show={!!selectedFoodBank} onHide={() => setSelectedFoodBank(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFoodBank && (
            <>
              <h5>{selectedFoodBank.name}</h5>
              <Form.Group className="mb-3">
                <Form.Label>Your Review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review here..."
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedFoodBank(null)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveReview} disabled={!reviewText.trim()}>
            Save Review
          </Button>
        </Modal.Footer>
      </Modal>
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