import React, { Component } from 'react';
import { Container,Row,Col,Card } from 'react-bootstrap';

import image4 from './gas.png';

class Gas extends Component {
  render() {


    return (
      <div id="gas">
      <h1 className="ml-5 mt-5 mb-5"> Pollutant gases </h1>
      <Row className="ml-3 mr-3">
      <Col lg="12">
      <Card className="center">
        <Card.Img variant="top"  src={image4} />

</Card>
      </Col>

      </Row>

   </div>
    );
  }
}

export default Gas;
