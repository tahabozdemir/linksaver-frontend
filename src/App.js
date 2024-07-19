import React from 'react';
import './App.css';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from './components/Auth/SignupForm';
import Signin from './components/Auth/SigninForm';
import HomePage from './pages/HomePage';
import LinkPage from './pages/LinkPage';
import AllLinkPage from './pages/AllLinksPage';
import FavoritesLinkPage from './pages/FavoritesLinkPage';
import './config/amplify-config'

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/links' element={<LinkPage />} />
            <Route path='/links/all' element={<AllLinkPage />} />
            <Route path='/links/favorites' element={<FavoritesLinkPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
