import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [token, setToken] = useState();

  // if (!token) {
  //   return 
  // }

  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={ <Dashboard></Dashboard>} />
          <Route path='/login' element={ <Login setToken={setToken} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
