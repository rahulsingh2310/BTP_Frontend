import React, { Component } from 'react';
import { Container,Row,Col,Card } from 'react-bootstrap';

class About extends Component {
  render() {


    return (
      <div id="about">
      <Row className="ml-3 mr-3">
      <Col lg="4" className="center" style={{marginTop:"50px"}}>

      <h1> About Us </h1>

      </Col>
      <Col lg="8" className="center" style={{marginTop:"50px"}}>

  <h4>Sentinel-5P is an Earth observation satellite developed by ESA as part of the Copernicus Programme. It is dedicated to monitoring air pollution.It give Scientific complicated data of various gases like CO, SO2 NO2, O3 etc  in netcdf format.
Air pollution rapidly increases the risk of environmental health problems, affecting society in all parts of the developed and developing worlds.
We are making a system which will extract data and give us pollution details and plot it on map all over india.


</h4>

      </Col>



      </Row>

   </div>
    );
  }
}

export default About;
