import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';



import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

import { Container,Row,Col,Card } from 'react-bootstrap';




ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const chartConfigs = {
  type: 'column2d',
  width: 1200,
  height: 600,
  dataFormat: 'json',
  dataSource: {    "chart": {
        "caption": "Cities with pollution level",
        "subCaption": "In mol/m2 = mole per meter square",
        "xAxisName": "City",
        "yAxisName": "Mol/m2",
        "numberSuffix": "  mol/m2",
        "theme": "fusion"
    },
    "data": [
        {
            "label": "Delhi",
            "value": "2.90"
        },
        {
            "label": "Gurgaon",
            "value": "2.60"
        },
        {
            "label": "Lucknow",
            "value": "1.80"
        },
        {
            "label": "Chandigarh",
            "value": "1.40"
        },
        {
            "label": "Jaipur",
            "value": "1.15"
        }
]
},


};

class BarChart extends Component {
  render () {
    return(
      <div>


      <Row>

      <Col lg="1">
      </Col>
      <MDBDropdown>
           <MDBDropdownToggle caret color="primary">
             Gases
           </MDBDropdownToggle>
           <MDBDropdownMenu basic>
             <MDBDropdownItem>CO</MDBDropdownItem>
             <MDBDropdownItem>NO2</MDBDropdownItem>
             <MDBDropdownItem>SO2</MDBDropdownItem>
             <MDBDropdownItem>CH4</MDBDropdownItem>
             <MDBDropdownItem>O3</MDBDropdownItem>
           </MDBDropdownMenu>
         </MDBDropdown>

         </Row>

      <ReactFC {...chartConfigs} />
      </div>

    );
  }
}

export default BarChart;
