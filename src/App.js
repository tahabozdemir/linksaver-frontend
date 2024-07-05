import React from 'react';
import './App.css';
import { Container, Grid, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AvatarHeader from './components/AvatarHeader';
import NavBar from './components/NavBar';
import StatsCard from './components/StatsCard';
import CategoryCard from './components/CategoryCard';

function App() {
  const handleOnCategoryClick = () => {alert("Tıklandı")}
  return (
    <Container>
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
          <StatsCard iconType="category" title="All Categories" count={3} />
        </Grid>
      </Grid>

      <Typography variant="h5" mt={4} mb={2}>
        Categories <IconButton onClick={handleOnCategoryClick}><AddIcon /></IconButton>
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CategoryCard iconType="home" title="Development" count={5} />
        </Grid>
        <Grid item xs={12}>
          <CategoryCard iconType="home" title="Home" count={3} />
        </Grid>
        <Grid item xs={12}>
          <CategoryCard iconType="edit" title="Design" count={3} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
