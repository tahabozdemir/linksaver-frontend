import React from 'react';
import './App.css';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from './components/SignupForm';
import Signin from './components/SigninForm';
import Home from './components/home';
import './config/amplify-config'

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='/' element={<Home />} />
            <Route path='signup' element={<Signup />} />
            <Route path='signin' element={<Signin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
