import React, { Component } from 'react';
import { Container,Row,Col,Card } from 'react-bootstrap';

import Graph from '../graph.js';

import AreaTimeAxis from '../scatter.js';


import BarChart from './bar.js'


class Charts extends Component {
  render() {


    return (
      <div id="gas">
      <h1 className="ml-5 mt-5 mb-5"> Charts </h1>
      <Row className="ml-3 mr-3">
      <Col lg="12">

        <Graph />
      </Col>




      </Row>

      <br></br>


      <br></br>

      <br></br>

      <br></br>

      <br></br>

      <br></br>


      <Row className="ml-3 mr-3">

            <Col lg="12">

            <AreaTimeAxis />

            </Col>



      </Row>


      <br></br>

            <br></br>

                  <br></br>

                        <br></br>

                              <br></br>



      <Row className="ml-3 mr-3">

            <Col lg="12">

            <BarChart />

            </Col>



      </Row>


   </div>
    );
  }
}

export default Charts;
