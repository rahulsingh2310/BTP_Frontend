import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import { Container,Row,Col } from 'react-bootstrap';

class Graph extends React.Component {
  state = {
    dataLine: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 255,255)",
          borderColor: "rgb(205, 130, 158)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [0.345, 0.361, 0.387, 0.324, 0.301, 0.311, 0.327]
        }
      ]
    }
  };

  render() {
    return (

      <Col lg="12" className="w-100" >
        <h3 className="mt-5"></h3>
            <Line className="bar" data={this.state.dataLine} options={{ responsive: true }} />
        </Col>

    );
  }
}

export default Graph;
