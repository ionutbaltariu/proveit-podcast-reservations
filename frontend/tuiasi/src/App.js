import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import Profil from './Profil/Profil'
import Administratori from './Administratori/Administratori'
import Tichete from './Tichete/Tichete';
import Instructiuni from './Instructiuni/Instructiuni';
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
          <Route path='/profil' element={ <Profil></Profil>} />
          <Route path='/administratori' element={ <Administratori></Administratori>} />
          <Route path='/raportare-problema' element={ <Tichete></Tichete>} />
          <Route path='/instructiuni' element={ <Instructiuni></Instructiuni>} />
          <Route path='/login' element={ <Login setToken={setToken} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
