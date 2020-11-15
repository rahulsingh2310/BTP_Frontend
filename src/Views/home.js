import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import Header from './home/header.js';
import About from './home/about.js';
import Features from './home/features.js';
import Gas from './home/gas.js';


export class Home extends React.Component {
  render(){
    return(
      <div>
      <Header/>
      <About />
      <Features />

      <Gas />

      </div>
    );
  }
}

export default Home;
