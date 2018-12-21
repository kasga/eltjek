import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "unstated";
import NavigationContainer from "./unstated/navigationContainer";
import "babel-polyfill";
import queryString from "query-string";

//Find the housing variable from the url variable
const query = queryString.parse(window.location.search);
const type = query.type ? query.housing : "";

//Assign the housing type to the unstated navigation container
let navigationContainer = new NavigationContainer({
  housingType: type
});

ReactDOM.render(
  <Provider inject={[navigationContainer]}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
