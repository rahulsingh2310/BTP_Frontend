import React, { Component } from 'react';
import { Container,Row,Col,Card } from 'react-bootstrap';

import Graph from '../graph.js';

import ChartsPage from '../scatter.js';

class Charts extends Component {
  render() {


    return (
      <div id="gas">
      <h1 className="ml-5 mt-5 mb-5"> Charts </h1>
      <Row className="ml-3 mr-3">
      <Col lg="6">

        <Graph />
      </Col>

      <Col lg="6">

      <ChartsPage />
      
      </Col>


      </Row>

   </div>
    );
  }
}

export default Charts;
