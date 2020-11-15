import React from 'react';
import { Scatter, Chart } from 'react-chartjs-2';
import { MDBContainer } from 'mdbreact';

import { Container,Row,Col } from 'react-bootstrap';

class ChartsPage extends React.Component {
  state = {
    dataScatter: {
      labels: ['Scatter'],
      datasets: [
        {
          borderColor: 'rgba(255,255,255)',
          backgroundColor: 'rgba(0,0,0)',
          label: '',
          data: [
            {
              x: 1,
              y: 0.31
            },
            {
              x: 2,
              y: 0.33
            },
            {
              x: 5,
              y: 0.34
            },
            {
              x: 10,
              y: 0.4
            },

            {
              x: 15,
              y: 0.2597
            },
            {
              x: 25,
              y: 0.2797
            },
            {
              x: 40,
              y: 0.2996
            },
            {
              x: 50,
              y: 0.3196
            },
            {
              x: 70,
              y: 0.396
            },
            {
              x: 80,
              y: 0.376
            }
          ]
        }
      ]
    },
    optionsScatter: {

      scales: {
        xAxes: [
          {
            type: 'logarithmic',
            position: 'bottom',
            ticks: {
              userCallback: function(tick) {
                var remain =
                  tick / Math.pow(10, Math.floor(Chart.helpers.log10(tick)));
                if (remain === 1 || remain === 2 || remain === 5) {
                  return tick.toString() + 'Day';
                }
                return '';
              }
            },

          }
        ],
        yAxes: [
          {
            type: 'linear',
            ticks: {
              userCallback: function(tick) {
                return tick.toString() + 'mol/m2';
              }
            },

          }
        ]
      }
    }
  };

  render() {
    return (
       <Col lg="12" className="w-100" >
        <h3 className='mt-5'></h3>
        <Scatter
          data={this.state.dataScatter}
          options={this.state.optionsScatter}
        />
	</Col>

    );
  }
}

export default ChartsPage;
