import React from "react";
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from 'react-fusioncharts';


import axios from 'axios';

import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBBtn } from "mdbreact";

import { Container,Row,Col,Card } from 'react-bootstrap';

var schemadata = require('./schema1.json');



var data1 = [];
var data2 = [];
var data3 = [];


ReactFC.fcRoot(FusionCharts, TimeSeries);

const jsonify = res => res.json();
const dataFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/plotting-multiple-series-on-time-axis-data.json"
).then(jsonify);
const schemaFetch = fetch(
  "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/plotting-multiple-series-on-time-axis-schema.json"
).then(jsonify);

const dataSource = {
  chart: {},
  caption: {
    text: "Pollution measurement graph"
  },
  subcaption: {
    text: "Atmospheric gases"
  },
  series: "Type",
  yaxis: [
    {
      plot: "Gas Value",
      title: "Gas Value",
      format: {
        suffix: " mol/m2"
      }
    }
  ]
};

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.onFetchData = this.onFetchData.bind(this);
    this.state = {
      state1:'Haryana',
      state2:'Assam',
      state3:'Haryana',
      state4:'Assam',
      check:false,
      count : 0,
      timeseriesDs: {
        type: "timeseries",
        renderAt: "container",
        width: "1200",
        height: "600",
        dataSource
      }
    };
  }



  fetchapi() {

	data1 = [];
	data2 = [];
	data3 = [];


    axios.get(`http://localhost:8000/gas/getValueBasedOnGasState/?state=${this.state.state1}&gas=NO2`)
      .then(res => {
        const persons1 = res.data.info;
      //  console.log(persons1);

              for (var i = 0; i < persons1.length; i++){
                  var obj1 = persons1[i];
                  //console.log("Name: " + obj.latitude + ", " + obj.longitude);
                  data1 = data1.concat([[obj1.date,obj1.state,obj1.value]]);

                }
                console.log(data1);

      })

      axios.get(`http://localhost:8000/gas/getValueBasedOnGasState/?state=${this.state.state2}&gas=NO2`)
        .then(res => {
          const persons2 = res.data.info;
        //  console.log(persons);

                for (var i = 0; i < persons2.length; i++){
                    var obj2 = persons2[i];
                    //console.log("Name: " + obj.latitude + ", " + obj.longitude);
                    data2 = data2.concat([[obj2.date,obj2.state,obj2.value]]);

                  }
                  console.log(data2);

                  data3 = [...data1, ...data2];

                  console.log(data3);

		  this.onFetchData();
		  
        })



  }


  componentDidMount() {
    this.fetchapi()


    
  }






  onFetchData() {

    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = data3;
      console.log(data);
      data3 = [];
      const schema = schemadata;
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      timeseriesDs.dataSource.data = fusionTable;
      this.setState({
        timeseriesDs
      });
    });
  }




componentDidUpdate(prevProps, prevState) {
  if (prevState.check !== this.state.check) {
    console.log('pokemons state has changed.');
	 this.fetchapi();


  
	
  }
}


onClickHandler1 = event => {
    this.setState({ state1: event.target.innerHTML })
	
  }


onClickHandler2 = event => {
      this.setState({ state2: event.target.innerHTML })
	
    }


onClickHandler3 = () =>{
this.setState(prevState => ({
  check: !prevState.check
}));

console.log(this.state.check);

	this.fetchapi();
}


  render() {
    return (
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


<Col lg="2">
      </Col>

         <Col>
         <MDBDropdown>
              <MDBDropdownToggle caret color="primary">
                {this.state.state1}
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




                  <Col>
                  <MDBDropdown>
                       <MDBDropdownToggle caret color="primary">
                         {this.state.state2}
                       </MDBDropdownToggle>
                       <MDBDropdownMenu basic>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Andhra Pradesh</MDBDropdownItem>

                         <MDBDropdownItem onClick={this.onClickHandler2}>Arunanchal Pradesh</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Assam</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Bihar</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Chhattisgarh</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Dadara & Nagar Havelli</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Goa</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Gujarat</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Haryana</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Himachal Pradesh</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Jammu & Kashmir</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Jharkhand</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Karnataka</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Kerala</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Lakshadweep</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Madhya Pradesh</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Maharashtra</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Manipur</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Meghalaya</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Mizoram</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Nagaland</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>NCT of Delhi</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Odisha</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Punjab</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Rajasthan</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Sikkim</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Telangana</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Tripura</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Uttar Pradesh</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>Uttarakhand</MDBDropdownItem>
                         <MDBDropdownItem onClick={this.onClickHandler2}>West Bengal</MDBDropdownItem>


                       </MDBDropdownMenu>
                     </MDBDropdown>

                  </Col>


 <MDBBtn color="primary" onClick={this.onClickHandler3}>Submit</MDBBtn>

 <Col lg="4">
      </Col>
                   

         </Row>

        {this.state.timeseriesDs.dataSource.data ? (
          <ReactFC {...this.state.timeseriesDs} />
        ) : (
          "loading"
        )}




      </div>
    );
  }
}

export default Graph;
