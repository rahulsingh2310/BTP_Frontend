import React, { Component } from 'react';
import ParticlesBg  from "particles-bg";

class Header extends Component {
  render() {



    return (
      <div className="center">
      <ParticlesBg type="cobweb" bg={true} />
      <div id="home">
      <h1 > India  </h1>
      <h1 > Pollution Measurement </h1>

      </div>

   </div>
    );
  }
}

export default Header;
