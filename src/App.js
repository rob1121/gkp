import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';
import './assets/sass/app.sass';
import { Provider } from 'react-redux';
import store from './store/index';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Home from './screens/HomePage';
import Report from './screens/ReportPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

const NavLink = props => (
  <li style={styles.navItem}>
    <Link {...props} style={{ color: "inherit" }} />
  </li>
);

export default class App extends Component {

  render() {
    return (
      <Provider store={store} >
        <Router>
          <Route
            render={({ location }) => (
              <div style={styles.fill}>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/home" />}
                />

                <ul style={styles.nav}>
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/report/rob">Report</NavLink>
                </ul>

                <div style={styles.content}>
                  <TransitionGroup>
                    {/* no different than other usage of
                CSSTransition, just make sure to pass
                `location` to `Switch` so it can match
                the old location as it animates out
            */}
                    <CSSTransition key={location.key} classNames="fade" timeout={300}>
                      <Switch location={location}>
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/report/:name" component={Report} />
                        {/* Without this `Route`, we would get errors during
                    the initial transition from `/` to `/hsl/10/90/50`
                */}
                        <Route render={() => <div>Not Found</div>} />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                </div>
              </div>
            )}
          />
        </Router>
      </Provider>
    );
  }
}



const styles = {};

styles.fill = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

styles.content = {
  ...styles.fill,
  top: "40px",
  textAlign: "center"
};

styles.nav = {
  padding: 0,
  margin: 0,
  position: "absolute",
  top: 0,
  height: "40px",
  width: "100%",
  display: "flex"
};

styles.navItem = {
  textAlign: "center",
  flex: 1,
  listStyleType: "none",
  padding: "10px"
};

styles.hsl = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};

styles.rgb = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};