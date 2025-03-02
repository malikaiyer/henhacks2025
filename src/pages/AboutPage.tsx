import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
  const createFadeIn = (delay: number = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay }
  });

  const teamMembers = [
    {
        name: 'Malika Iyer',
        role: 'Front-End Developer',
        description: 'Creates user-friendly interfaces that are both visually appealing and accessible. She uses her design skills to help tackle food insecurity.',
        linkedin: 'https://www.linkedin.com/in/malikaiyer/',
        image: '/images/team/Malika Headshot.JPG'
      },
      {
        name: 'Mayowa Ayeni',
        role: 'Full Stack Developer',
        description: 'Combines front-end design with back-end expertise to build reliable, scalable applications. He also works closely with local food banks and community partners.',
        linkedin: 'https://www.linkedin.com/in/mayonezs/',
        image: '/images/team/IMG_8785.jpeg'
      },
      {
        name: 'Bryant Ferguson',
        role: 'Back-End Developer',
        description: 'Develops the core systems that power our applications. He creates smart algorithms to turn available ingredients into healthy meal plans.',
        linkedin: 'https://www.linkedin.com/in/bryant-ferguson',
        image: '/images/team/Image.png'
      }
  ];

  return (
    <Container fluid className="p-0" style={{ minHeight: '100vh', maxWidth: '100%' }}>
      <Container className="py-5" style={{ maxWidth: '1400px' }}>
        <motion.div {...createFadeIn()}>
          <h1 style={{ 
            color: '#388E3C', 
            fontFamily: "'Sigmar', serif", 
            textShadow: "4px 4px 4px #aaa", 
            fontSize: '2.5rem', 
            textAlign: 'center', 
            marginBottom: '2rem' 
          }}>
            About RescueBites
          </h1>

          <Row className="mb-5">
            <Col md={8} className="mx-auto">
              <motion.div {...createFadeIn(0.2)}>
                <Card className="border-0 shadow-sm">
                  <Card.Body className="text-center">
                    <h2 style={{ color: '#388E3C', marginBottom: '1rem' }}>Our Mission</h2>
                    <p className="lead">
                      RescueBites is dedicated to reducing food waste and fighting hunger by connecting 
                      communities with local food resources and providing smart meal planning solutions.
                    </p>
                    <p>
                      We believe that everyone deserves access to nutritious food, and through technology 
                      and community engagement, we're working to make that a reality.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>

          <Row className="mb-5">
            <Col xs={12}>
              <motion.h2 
                {...createFadeIn(0.3)} 
                style={{ 
                  color: '#388E3C', 
                  textAlign: 'center', 
                  marginBottom: '2rem' 
                }}
              >
                Our Impact
              </motion.h2>
            </Col>
            <Col md={4}>
              <motion.div {...createFadeIn(0.4)}>
                <Card className="text-center h-100 border-0 shadow-sm">
                  <Card.Body>
                    <h3 style={{ color: '#388E3C' }}>1000+</h3>
                    <p>Meals Planned</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div {...createFadeIn(0.5)}>
                <Card className="text-center h-100 border-0 shadow-sm">
                  <Card.Body>
                    <h3 style={{ color: '#388E3C' }}>50+</h3>
                    <p>Community Partners</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div {...createFadeIn(0.6)}>
                <Card className="text-center h-100 border-0 shadow-sm">
                  <Card.Body>
                    <h3 style={{ color: '#388E3C' }}>500+</h3>
                    <p>Families Helped</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <motion.h2 
                {...createFadeIn(0.7)} 
                style={{ 
                  color: '#388E3C', 
                  textAlign: 'center', 
                  marginBottom: '2rem' 
                }}
              >
                Our Team
              </motion.h2>
            </Col>
            {teamMembers.map((member, index) => (
              <Col key={index} md={4} className="mb-4">
                <motion.div {...createFadeIn(0.8 + (index * 0.1))}>
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="text-center">
                      <div className="mb-3" style={{ 
                        width: '150px', 
                        height: '150px', 
                        margin: '0 auto',
                        borderRadius: '50%',
                        overflow: 'hidden'
                      }}>
                        <img 
                          src={member.image} 
                          alt={member.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      <h4 style={{ color: '#388E3C' }}>{member.name}</h4>
                      <h6 className="text-muted mb-3">{member.role}</h6>
                      <p>{member.description}</p>
                      <a 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary"
                        style={{
                          borderColor: '#388E3C',
                          color: '#388E3C',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#388E3C';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#388E3C';
                        }}
                      >
                        <i className="fab fa-linkedin mr-2"></i> Connect on LinkedIn
                      </a>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>

      <style>{`
        .card {
          transition: transform 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
        }
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </Container>
  );
};

export default AboutPage;