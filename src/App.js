import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./Landing";
import Map from "./Map";

function App() {
  return (
    <BrowserRouter>
      <Route exact={true} path="/" component={Landing}></Route>
      <Route exact={true} path="/map" render={Map} />
    </BrowserRouter>
  );
}

export default App;
