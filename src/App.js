import React, { useEffect, useState } from 'react';
import './App.css';
import { Container, CircularProgress } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Signup from './components/Auth/SignupForm';
import Signin from './components/Auth/SigninForm';
import HomePage from './pages/HomePage';
import { fetchToken } from './redux/userSlice';
import LinkPage from './pages/LinkPage';
import AllLinkPage from './pages/AllLinksPage';
import FavoritesLinkPage from './pages/FavoritesLinkPage';
import NotFoundPage from './pages/NotFoundPage';
import NotAuthenticatedPage from './pages/NotAuthenticatedPage';
import './config/amplify-config'


function App() {
  const { userId } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(fetchToken());
      setLoading(false);
    };
    checkAuth();
  }, [dispatch]);

  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>)
  }

  return (
    <Container>
      <BrowserRouter>
        <Routes>
          {userId ? (
            <>
              <Route path='/' element={<HomePage />} />
              <Route path='/links' element={<LinkPage />} />
              <Route path='/all/links' element={<AllLinkPage />} />
              <Route path='/all/links/favorites' element={<FavoritesLinkPage />} />
              <Route path='/signup' element={<Navigate to="/" />} />
              <Route path='/signin' element={<Navigate to="/" />} />
              <Route path="*" element={<NotFoundPage />} />
            </>
          ) : (
            <>
              <Route path='/signup' element={<Signup />} />
              <Route path='/signin' element={<Signin />} />
              <Route path="/" element={<NotAuthenticatedPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </Container>
  );
}
export default App;
