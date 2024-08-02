import React, { useEffect, useState, Suspense, lazy } from 'react';
import './App.css';
import { Container, CircularProgress } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToken } from './redux/userSlice';
import './config/amplify-config';
import ForgotPassword from './pages/ForgotPassword';

const Signup = lazy(() => import('./components/Auth/SignupForm'));
const Signin = lazy(() => import('./components/Auth/SigninForm'));
const HomePage = lazy(() => import('./pages/HomePage'));
const LinkPage = lazy(() => import('./pages/LinkPage'));
const AllLinkPage = lazy(() => import('./pages/AllLinksPage'));
const FavoritesLinkPage = lazy(() => import('./pages/FavoritesLinkPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const NotAuthenticatedPage = lazy(() => import('./pages/NotAuthenticatedPage'));

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
      </Container>
    );
  }

  return (
    <Container>
      <BrowserRouter>
        <Suspense fallback={
          <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress sx={{ size: "100" }} />
          </Container>}>
          <Routes>
            {userId ? (
              <>
                <Route path='/' element={<HomePage />} />
                <Route path='/links' element={<LinkPage />} />
                <Route path='/all/links' element={<AllLinkPage />} />
                <Route path='/all/links/favorites' element={<FavoritesLinkPage />} />
                <Route path='/signup' element={<Navigate to="/" />} />
                <Route path='/signin' element={<Navigate to="/" />} />
                <Route path='*' element={<NotFoundPage />} />
              </>
            ) : (
              <>
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/' element={<NotAuthenticatedPage />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='*' element={<NotFoundPage />} />
              </>
            )}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Container>
  );
}

export default App;
