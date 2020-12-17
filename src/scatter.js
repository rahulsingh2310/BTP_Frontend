import React, { Component } from 'react';
// Import fusioncharts.js files from fusioncharts module
import FusionCharts from 'fusioncharts';
// Import the timeseries file from fusioncharts module
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';
// Import ReactFusioncharts from react-fusioncharts module
// import ReactFC from 'react-fusioncharts';
import ReactFC from 'react-fusioncharts';

import axios from 'axios';



import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

import { Container,Row,Col,Card } from 'react-bootstrap';
var schemadata = require('./schema.json');


// Add core FusionCharts module and TimeSeries module as dependecies in react-fusioncharts
ReactFC.fcRoot(FusionCharts, TimeSeries);

const jsonify = res => res.json();
// This is the remote url to fetch the data.
const dataFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/area-chart-with-time-axis-data.json'
).then(jsonify);
// This is the remote url to fetch the schema.


const dataFetch1 = fetch(
  'http://localhost:8000/gas/getValueBasedOnGasState/?state=Haryana&gas=NO2'
).then(jsonify);

var data1 = [];

class AreaTimeAxis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Here timeseriesDs is the configuration object which we will pass as a prop to our ReactFC component.
      timeseriesDs: {
        type: 'timeseries',
        renderAt: 'container',
        width: '1200',
        height: '600',
        dataSource: {
          chart: {
            showLegend: 0
          },
          caption: {
            text: 'Pollution measurement'
          },
          yAxis: [
            {
              plot: {
                value: 'Gas Value',
                type: 'area'
              },
              title: 'Gas Value'
            }
          ],
          // Initially data is set as null
          data: null
        }
      }
    };

    // In this method we will create our DataStore and using that we will create a custom DataTable which takes two
    // parameters, one is data another is schema. Check the method definition to get more info.
    this.createDataTable = this.createDataTable.bind(this);
  }

  createDataTable() {
    Promise.all([dataFetch]).then(res => {
      const data = data1;
      console.log(data1);
      const schema = schemadata;
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionTable = fusionDataStore.createDataTable(data, schema);
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      timeseriesDs.dataSource.data = fusionTable;
      this.setState({
        timeseriesDs
      });
    });
  }

  // We are creating the DataTable immidietly after the component is mounted
  componentDidMount() {
    axios.get(`http://localhost:8000/gas/getValueBasedOnGasState/?state=Haryana&gas=NO2`)
      .then(res => {
        const persons = res.data.info;
        console.log(persons);

            	for (var i = 0; i < persons.length; i++){
            			var obj = persons[i];
            			//console.log("Name: " + obj.latitude + ", " + obj.longitude);
            			data1 = data1.concat([[obj.date,obj.value]]);

            		}
                console.log(data1);
      })



    this.createDataTable();
  }

  render() {
    return (
      <div className="App">

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





        <ReactFC {...this.state.timeseriesDs} />
      </div>
    );
  }
}

export default AreaTimeAxis;
