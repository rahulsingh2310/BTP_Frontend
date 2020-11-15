import React ,{ Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';

import './App.css';
import ReactMap from './Views/react-map';
import GoogleMap from './Views/react-google-maps';
import NavbarPage from './Views/navbar';
import Home from './Views/home';
import Charts from './Views/charts';
import Footer from './Views/home/footer.js';


/* import PatientDB from './components/patientdb';*/

const history = require('history').createBrowserHistory;

class App extends Component{


  render () {

    const pages = [
      {
        pageLink: '/state-map',
        view: ReactMap,
        displayName: '',
        animationDelayForNavbar: 0.2,
      },
      {
        pageLink: '/google',
        view: GoogleMap,
        displayName: '',
        animationDelayForNavbar: 0.2,
      },
      {
        pageLink: '/',
        view: Home,
        displayName: '',
        animationDelayForNavbar: 0.2,
      },
      {
        pageLink: '/charts',
        view: Charts,
        displayName: '',
        animationDelayForNavbar: 0.2,
      },

    ];


  return (
    <div className="App">
      <Router history={history}>
        <Route
          render={({location}) => (
            <div className="Almighty-Router">
               <NavbarPage />
              <Switch location={location}>
                {pages.map((page, i) => {
                  return (
                    <Route
                      exact
                      path={page.pageLink}
                      component={page.view}
                      key={i}
                    />

                  );
                })}

                <Redirect to="/" />
              </Switch>

              <Footer />
            </div>
          )}
        />
      </Router>
    </div>
  );
}
}

export default(App);
