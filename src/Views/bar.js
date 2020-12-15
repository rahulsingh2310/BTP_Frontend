import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import axios from 'axios';
import DatePicker from 'react-date-picker';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';


import 'react-calendar/dist/Calendar.css';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

import { Container,Row,Col,Card } from 'react-bootstrap';









ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);


class BarChart extends Component {
  constructor(props) {
      super(props);
      this.state = {
        no2_data: [],
        date : new Date(),
       };
    }


onChange = date => this.setState({ date })


  componentDidMount() {
  axios.get(`http://localhost:8000/gas/getValueInARange/?gas=NO2&startDate=2020-10-19&endDate=2020-10-19`)
    .then(res => {
      const persons = res.data.info;
      console.log(res.data.info);

      this.setState({ no2_data : persons });
    })




  }



  render () {
    console.log(this.state.no2_data);

    let data1 = [];
      for (var i = 0; i < this.state.no2_data.length; i++){
        var obj = this.state.no2_data[i];

        data1 = data1.concat({ label: obj.State, value:obj.Value });

      }

      console.log(data1);

      console.log(this.state.date);
      const chartConfigs = {
        type: 'column2d',
        width: 1200,
        height: 600,
        dataFormat: 'json',
        dataSource: {    "chart": {
              "caption": "States with pollution level",
              "subCaption": "In mol/m2 = mole per meter square",
              "xAxisName": "States",
              "yAxisName": "Mol/m2",
              "numberSuffix": "  mol/m2",
              "theme": "fusion"
          },
          "data": data1
      },


      };


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

         <Col>
         <DatePicker
     onChange={this.onChange}
     value={this.state.date}
   />
         </Col>

         </Row>

      <ReactFC {...chartConfigs} />
      </div>

    );
  }
}

export default BarChart;
