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
        date : new Date(2020,9,10),
        value : "NO2",
        Gasdate : "2020-10-19"
       };
    }


fetchapi() {
  axios.get(`http://localhost:8000/gas/getValuesForDate?gas=${this.state.value}&date=${this.state.Gasdate}`)
    .then(res => {
      const persons = res.data.info;
    //  console.log(res.data.info);
      this.setState({ no2_data : persons });
    })

}

onChange = d => {
  var datestring = d.getFullYear()  + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) ;
  this.setState({ Gasdate : datestring })
  this.setState({date : d })
}


onClickHandler = event => {
  this.setState({ value: event.target.innerHTML })
}



componentDidMount() {
    this.fetchapi()
  }

  componentDidUpdate() {
    this.fetchapi()
  }



  render () {
//    console.log(this.state.no2_data);
  //  console.log(this.state.Gasdate);
    let data1 = [];
      for (var i = 0; i < this.state.no2_data.length; i++){
        var obj = this.state.no2_data[i];

        data1 = data1.concat({ label: obj.State, value:obj.Value });

      }

//      console.log(data1);

  //    console.log(this.state.date);
      const chartConfigs = {
        type: 'column2d',
        width: 1200,
        height: 600,
        dataFormat: 'json',
        dataSource: {    "chart": {
              "caption": "States with pollution level",
              "subCaption": "In mmol/m2 = mole per meter square",
              "xAxisName": "States",
              "yAxisName": "mMol/m2",
              "numberSuffix": "  mmol/m2",
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
             {this.state.value}
           </MDBDropdownToggle>
           <MDBDropdownMenu basic>
             <MDBDropdownItem onClick={this.onClickHandler}>CO</MDBDropdownItem>
             <MDBDropdownItem onClick={this.onClickHandler}>NO2</MDBDropdownItem>
             <MDBDropdownItem onClick={this.onClickHandler}>SO2</MDBDropdownItem>
             <MDBDropdownItem onClick={this.onClickHandler}>CH4</MDBDropdownItem>
             <MDBDropdownItem onClick={this.onClickHandler}>O3</MDBDropdownItem>
           </MDBDropdownMenu>
         </MDBDropdown>

         <Col>
         <DatePicker
     onChange={this.onChange}
     value={this.state.date}
   />
         </Col>
<p>Date: {this.state.Gasdate}       </p>
 <p>   Value: {this.state.value}</p>
         </Row>

      <ReactFC {...chartConfigs} />
      </div>

    );
  }
}

export default BarChart;
