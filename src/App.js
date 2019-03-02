import React, { Component } from "react";
import { Redirect, MemoryRouter, Switch, Route } from "react-router-dom";
import Home from "./components/screens/home";
import Residents from "./components/screens/residents";
import Kitchen from "./components/screens/kitchen";
import Livingroom from "./components/screens/livingroom";
import Washing from "./components/screens/washing";
import Heating from "./components/screens/heating";
import Result from "./components/screens/result";
import queryString from "query-string";

// import _ from "underscore";
import "./scss/index.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }

  skipFirstPage = () => {
    const query = queryString.parse(window.location.search);
    if (query.type === "beboere") {
      return <Redirect to={query.type} />;
    }
  };

  render() {
    return (
      <div id="o-eltjek">
        <MemoryRouter>
          <div className="o-container">
            <Switch>
              <Route exact path="/start" component={Home} />
              <Route exact path="/beboere" component={Residents} />
              <Route exact path="/kokken" component={Kitchen} />
              <Route exact path="/stue" component={Livingroom} />
              <Route exact path="/vasketoj" component={Washing} />
              <Route exact path="/opvarmning" component={Heating} />
              <Route exact path="/resultat" component={Result} />
              {this.skipFirstPage()}
            </Switch>
            <Route exact path="/" component={Home} />
          </div>
        </MemoryRouter>
      </div>
    );
  }
}

export default App;
