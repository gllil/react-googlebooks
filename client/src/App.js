import React from 'react';
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Search from "./pages/Search"
import Saved from "./pages/Saved"
import './App.css';


function App() {
  return (
    <Router>
    <Nav />
    <Switch>
      <Route exact path="/" component={Search} />
      <Route path="/saved" component={Saved} />
    </Switch>
    </Router>
  );
}

export default App;
