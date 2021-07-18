import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import logo from '../logo.png'

const CardGroup = () => {
  return (
    <Container fluid='sm' >
      <Row sm={4} className="g-4" style={{ marginTop: "50px" }}>
        {Array.from({ length: 20 }).map((_, idx) => (
          <Col>
            <Card key={idx}>
              <Card.Img variant="top" src={logo} />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit longer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default CardGroup