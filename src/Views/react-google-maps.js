import {Map, Polygon,InfoWindow,Marker, HeatMap, GoogleApiWrapper} from 'google-maps-react';
import React from 'react'

import { Container,Row,Col } from 'react-bootstrap';

const data = require('../test02.json');


export class MapContainer extends React.Component {
 constructor(props) {
    super(props);
	 this.state = {
    		seen: false
  	 };
   }

    fetchPlaces(mapProps, map) {
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
        // ...
      }
    onMapClicked(mapProps, map, clickEvent) {
        // ...
        console.log(clickEvent.latLng.lat())
        console.log(clickEvent.latLng.lng())
//	window.alert("Selected Latitude :" + clickEvent.latLng.lat() +  "\n" + "Selected Longitude : "  + clickEvent.latLng.lng() +  "\n\n" +   "Results \n" +   "Latitude : 17.228323\n" +  "Longitude : 78.76791\n" +  "Co2 Value : 0.041603442 mol/m2\n")





      }










    render() {
	let data1 = [];
		for (var i = 0; i < data.length; i++){
			var obj = data[i];
			//console.log("Name: " + obj.latitude + ", " + obj.longitude);
			data1 = data1.concat({ lat: obj.latitude, lng: obj.longitude, weight:obj.co2 });

		}




		console.log(data1)


          const gradient = [
            'rgba(0, 255, 255, 0)',
            'rgba(0, 255, 255, 1)',
            'rgba(0, 191, 255, 1)',
            'rgba(0, 127, 255, 1)',
            'rgba(0, 63, 255, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 0, 223, 1)',
            'rgba(0, 0, 191, 1)',
            'rgba(0, 0, 159, 1)',
            'rgba(0, 0, 127, 1)',
            'rgba(63, 0, 91, 1)',
            'rgba(127, 0, 63, 1)',
            'rgba(191, 0, 31, 1)',
            'rgba(255, 0, 0, 1)'
          ];

          const positions = [
            { lat: 25.782551, lng: 85.445368, weight:4 },
            { lat: 25.792551, lng: 85.405368, weight:5 },
            { lat: 0.42642725, lng: 70.51513, weight:3.8728197 },
            { lat: 0.5560175, lng: 70.81896, weight:3.8245197 },
            { lat: 0.67880213, lng: 71.10717, weight:3.47403 },
            { lat: 5.692977, lng: 93.166084, weight:4.47403 },
            { lat: 5.703118, lng: 93.46106, weight:6.47403 },
            { lat: 5.7134805, lng: 93.77106, weight:5.47403 }

        ];




        return (
            <div id="google">
            <Map
                style={{height: '100%', width: '100%', position: 'relative', marginLeft: '0%'}}
                className='map'
                google={this.props.google}
                zoom={5}
                onClick={this.onMapClicked}
                initialCenter={{
                    lat: 22.5937,
                    lng: 78.9629

                }}
            >

                <HeatMap
                    gradient={gradient}
                    opacity={0.6}
                    positions={data1}
                    radius={10}
                />

                </Map>

			{this.state.seen ? <h1>HI</h1>  : null}


            </div>
        )
    }
}


export default GoogleApiWrapper({
       apiKey: "AIzaSyATgv28IzCv0bjkOBbAoejH-Z13BL4uV8U",
       libraries: ['visualization']
})(MapContainer)
