import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const NotFoundPage = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h3>404 Page Not Found</h3>
          <p>We are sorry, but the page you are looking for does not exist.</p>
          <Button as={Link} to="/" variant="primary">
            Go to Home Page
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
