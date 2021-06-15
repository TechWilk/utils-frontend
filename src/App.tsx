import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PhpClassGenerator from './components/PhpClassGenerator';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/php/class/generate'>

          <PhpClassGenerator />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
