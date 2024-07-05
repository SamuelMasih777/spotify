import React from 'react';
import './App.css';
import Dashboard from './component/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';

function App() {
  return (
    <div className="">
      <Navbar/>      
    <Routes>
      <Route path = '/' element={<Dashboard/>}/>
    </Routes>
    </div>
  );
}

export default App;
