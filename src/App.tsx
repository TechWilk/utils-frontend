import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import PhpClassGenerator from './components/PhpClassGenerator';
import Home from './components/Home';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path='/php/class/generate' 
          element={<PhpClassGenerator />}
        />
        <Route 
          path='/' 
          element={<Home />}
        />
        <Route
          path='/*'
          element={<NotFound />}
        />
      </Routes>
    </Router>
  );
}

export default App;
