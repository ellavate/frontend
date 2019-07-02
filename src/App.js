import React from "react";
import "./App.css";
import Header from "./components/Header";
import { Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Header} />
      <Route exact path="/" component={Landing} />
      <Route path="/home" component={Home} />
    </div>
  );
}

export default App;
