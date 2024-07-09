import React, { useState, useEffect } from 'react';
import './App.css';
import { api } from './api';
import { Container, Grid, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AvatarHeader from './components/AvatarHeader';
import NavBar from './components/NavBar';
import StatsCard from './components/StatsCard';
import CategoryBoard from './components/CategoryBoard';
import Signup from './components/SignupForm';
import Signin from './components/SigninForm';
import './config/amplify-config'

function App() {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchCategories = () => {
    api().get('/category/all')
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        alert(`Error: ${error.response.data.error.message}`);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='signup' element={<Signup />} />
            <Route path='signin' element={<Signin />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Grid container spacing={2} alignItems="center">
        <AvatarHeader />
        <NavBar />
      </Grid>
      <Grid container spacing={2} mt={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard iconType="link" title="All Links" count={11} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard iconType="favorite" title="Favorites" count={5} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard iconType="delete" title="Deleted" count={3} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard iconType="category" title="All Categories" count={categories.length} />
        </Grid>
      </Grid>
      <Typography variant="h5" mt={4} mb={2}>
        Categories <IconButton onClick={handleOpenModal}><AddIcon /></IconButton>
      </Typography>
      <CategoryBoard modalOpen={modalOpen} handleCloseModal={handleCloseModal} categories={categories} fetchCategories={fetchCategories}
      ></CategoryBoard>
    </Container>
  );
}

export default App;
