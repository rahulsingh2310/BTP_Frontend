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
      indianstate : 'Haryana',
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

  onClickHandler1 = event => {
    this.setState({ indianstate: event.target.innerHTML })
    this.fetchapi();
  }

  fetchapi() {
    axios.get(`http://localhost:8000/gas/getValueBasedOnGasState/?state=${this.state.indianstate}&gas=NO2`)
      .then(res => {
        const persons = res.data.info;
        console.log(persons);

        data1 = [];

              for (var i = 0; i < persons.length; i++){
                  var obj = persons[i];
                  //console.log("Name: " + obj.latitude + ", " + obj.longitude);
                  data1 = data1.concat([[obj.date,obj.value]]);

                }
                console.log(data1);
                console.log(data1.length);
		this.createDataTable();
      })




  }


  // We are creating the DataTable immidietly after the component is mounted
  componentDidMount() {
    this.fetchapi();


  }

componentDidUpdate(prevProps, prevState) {
  if (prevState.indianstate !== this.state.indianstate) {
    console.log('pokemons state has changed.');
    this.fetchapi();

  }
}



  createDataTable() {
    Promise.all([dataFetch]).then(res => {
	if(data1.length!=0){
      const data = data1;
      console.log(data1);
      data1 = [];
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
	}
    });
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

         <Col>
         <MDBDropdown>
              <MDBDropdownToggle caret color="primary">
                {this.state.indianstate}
              </MDBDropdownToggle>
              <MDBDropdownMenu basic>
                <MDBDropdownItem onClick={this.onClickHandler1}>Andhra Pradesh</MDBDropdownItem>

                <MDBDropdownItem onClick={this.onClickHandler1}>Arunanchal Pradesh</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Assam</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Bihar</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Chhattisgarh</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Dadara & Nagar Havelli</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Goa</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Gujarat</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Haryana</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Himachal Pradesh</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Jammu & Kashmir</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Jharkhand</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Karnataka</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Kerala</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Lakshadweep</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Madhya Pradesh</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Maharashtra</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Manipur</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Meghalaya</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Mizoram</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Nagaland</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>NCT of Delhi</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Odisha</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Punjab</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Rajasthan</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Sikkim</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Telangana</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Tripura</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Uttar Pradesh</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>Uttarakhand</MDBDropdownItem>
                <MDBDropdownItem onClick={this.onClickHandler1}>West Bengal</MDBDropdownItem>


              </MDBDropdownMenu>
            </MDBDropdown>

         </Col>

		<p>State : {this.state.indianstate}</p>

         </Row>





        <ReactFC {...this.state.timeseriesDs} />
      </div>
    );
  }
}

export default AreaTimeAxis;
