import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const CommunityPage: React.FC = () => (
  <Container>
    <h1 style={{ color: '#388E3C', fontFamily: "'Sigmar', serif", textShadow: "4px 4px 4px #aaa", fontSize: '3rem', textAlign: 'center', paddingTop: '100px' }}>
      Community Resources
    </h1>
    <Row className="mt-5">
      {[1, 2, 3, 4, 5, 6].map((_, idx) => (
        <Col key={idx} md={4} className="mb-4">
          <Card className="community-card">
            <Card.Body>
              <Card.Title>Card Title {idx + 1}</Card.Title>
              <Card.Text>
                This is a placeholder for card content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    <style>{`
      .community-card {
        transition: background-color 0.3s ease;
      }
      .community-card:hover {
        background-color: #f0f0f0;
      }
    `}</style>
  </Container>
);

export default CommunityPage;