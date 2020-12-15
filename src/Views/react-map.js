import React, { useEffect, useState } from 'react'
import { ComposableMap, Geographies, Geography,   ZoomableGroup } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';

import axios from 'axios';

import ToggleButtonGroupControlled from '../button.js';


import LinearGradient from '../LinearGradient.js';

import Graph from '../graph.js';

import ChartsPage from '../scatter.js';

import { Container,Row,Col } from 'react-bootstrap';

const INDIA_TOPO_JSON = require('../india.topo.json');

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
  '#ffedea',
  '#ffcec5',
  '#ffad9f',
  '#ff8a75',
  '#ff5533',
  '#e2492d',
  '#be3d26',
  '#9a311f',
  '#782618'
];

const DEFAULT_COLOR = '#EEE';

const getRandomInt = () => {
  return parseInt(Math.random() * 100);
};



const geographyStyle = {
  default: {
    outline: 'none'
  },
  hover: {
    fill: '#ccc',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};

// will generate random heatmap data on every call

function App() {


  const [data1, setData1] = useState(null)
  const fetchURL = "http://localhost:8000/gas/getValueInARange/?gas=NO2&startDate=2020-10-19&endDate=2020-10-19"
  const getData1 = () =>
    fetch(`${fetchURL}`)
      .then((res) => res.json())
  useEffect(() => {
    getData1().then((data1) => setData1(data1.info))
  }, [])


  let data2 = [];

const data3 = data1?.map((item) =>
        data2 = data2.concat({state : item.State , no2_value : item.Value })
      )

console.log(data2);

  const getHeatMapData = () => {
    return [
      { id: 'AP', state: 'Andhra Pradesh', value: getRandomInt() },
      { id: 'AR', state: 'Arunachal Pradesh', value: getRandomInt() },
      { id: 'AS', state: 'Assam', value: getRandomInt() },
      { id: 'BR', state: 'Bihar', value: getRandomInt() },
      { id: 'CT', state: 'Chhattisgarh', value: getRandomInt() },
      { id: 'GA', state: 'Goa', value: 22 },
      { id: 'GJ', state: 'Gujarat', value: 22 },
      { id: 'HR', state: 'Haryana', value: getRandomInt() },
      { id: 'HP', state: 'Himachal Pradesh', value: 24 },
      { id: 'JH', state: 'Jharkhand', value: 26 },
      { id: 'KA', state: 'Karnataka', value: 27 },
      { id: 'KL', state: 'Kerala', value: getRandomInt() },
      { id: 'MP', state: 'Madhya Pradesh', value: getRandomInt() },
      { id: 'MH', state: 'Maharashtra', value: getRandomInt() },
      { id: 'MN', state: 'Manipur', value: getRandomInt() },
      { id: 'ML', state: 'Meghalaya', value: 59 },
      { id: 'MZ', state: 'Mizoram', value: getRandomInt() },
      { id: 'NL', state: 'Nagaland', value: 59 },
      { id: 'OR', state: 'Odisha', value: 59 },
      { id: 'PB', state: 'Punjab', value: getRandomInt() },
      { id: 'RJ', state: 'Rajasthan', value: getRandomInt() },
      { id: 'SK', state: 'Sikkim', value: getRandomInt() },
      { id: 'TN', state: 'Tamil Nadu', value: getRandomInt() },
      { id: 'TG', state: 'Telangana', value: getRandomInt() },
      { id: 'TR', state: 'Tripura', value: 14 },
      { id: 'UT', state: 'Uttarakhand', value: getRandomInt() },
      { id: 'UP', state: 'Uttar Pradesh', value: 15 },
      { id: 'WB', state: 'West Bengal', value: 17 },
      { id: 'WB', state: 'West Bengal', value: 17 },
      { id: 'AN', state: 'Andaman and Nicobar Islands', value: getRandomInt() },
      { id: 'CH', state: 'Chandigarh', value: getRandomInt() },
      { id: 'DN', state: 'Dadra and Nagar Haveli', value: 19 },
      { id: 'DD', state: 'Daman and Diu', value: 20 },
      { id: 'DL', state: 'Delhi', value: 59 },
      { id: 'JK', state: 'Jammu and Kashmir', value: 25 },
      { id: 'LA', state: 'Ladakh', value: getRandomInt() },
      { id: 'LD', state: 'Lakshadweep', value: getRandomInt() },
      { id: 'PY', state: 'Puducherry', value: getRandomInt() }
    ];
  };


  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState(getHeatMapData());




  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: data.reduce((max, item) => (item.value > max ? item.value : max), 0)
  };

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.value))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };

  const onChangeButtonClick = () => {
    setData(getHeatMapData());
  };

  const [position, setPosition] = useState({ coordinates: [78.9629, 22.5937], zoom: 1 });

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }


  return (
    <div className="w-100 contain">
    <Row>
    <Col lg="1">
    </Col>
    <Col lg="10" >

      <ReactTooltip>{tooltipContent}</ReactTooltip>
        <ComposableMap className="mr-5"
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={350}
          height={220}
          data-tip=""
        >
        <ZoomableGroup
        zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}>
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {


                const current = data.find(s => s.id === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              })
            }
          </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        <LinearGradient data={gradientData} />


        <div className="controls">
          <button onClick={handleZoomIn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <button onClick={handleZoomOut}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>

        <div className="center">
          <button className="mt16" onClick={onChangeButtonClick}>Change</button>
        </div>



        </Col>
        </Row>
        </div>

  );
}

export default App;
