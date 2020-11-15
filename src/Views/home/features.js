import React, { Component } from 'react';
import { Container,Row,Col,Card } from 'react-bootstrap';
import image1 from './img11.png';
import image2 from './img21.jpg';
import image3 from './img31.jpeg';
import { Link } from 'react-router-dom';

class Features extends Component {
  render() {


    return (
      <div id="features">
      <h1> </h1>
      <Row className="ml-3 mr-3">
      <Col lg="4">
       <Link to={'/state-map'}>
      <Card className="center">
        <Card.Img variant="top"  src={image1} />
<Card.Footer className="text-muted">Indian State-Wise Data</Card.Footer>

</Card>
</Link>
      </Col>



      <Col lg="4">
      <Link to={'/google'}>

      <Card className="center">
        <Card.Img variant="top" src={image2} />
<Card.Footer className="text-muted">GoogleMap Data</Card.Footer>

</Card>
</Link>

      </Col>




      <Col lg="4">
      <Link to={'/charts'}>

      <Card className="center">
        <Card.Img variant="top" src={image3} />
      <Card.Footer className="text-muted"> Charts </Card.Footer>

      </Card>
      </Link>

      </Col>








      </Row>

   </div>
    );
  }
}

export default Features;
