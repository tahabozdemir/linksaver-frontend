import React, { useState, useEffect } from 'react';
import './App.css';
import { api } from './api'
import { Container, Grid, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AvatarHeader from './components/AvatarHeader';
import NavBar from './components/NavBar';
import StatsCard from './components/StatsCard';
import CategoryCard from './components/CategoryCard';
import CategoryModal from './components/CategoryModal';

function App() {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    api().get('/category/all')
      .then((response) => {
        setCategories(...categories, response.data.data)
      })
      .catch((error) => {
        alert(`Error: ${error.response.data.error.message}`)
      });
  }, [])

  const handleAddCategory = (values) => {
    api().post('/category', {
      title: values.category,
      emoji: 'home'
    })
      .then((response) => {
        setCategories([...categories, { id: response.data.data.id, emoji: 'home', title: values.category, count: 0 }]);
      })
      .catch((error) => {
        alert(`Error: ${error.response.data.error.message}`)
      });
    handleCloseModal();
  };

  const handleDeleteCategory = (id) => {
    api().delete(`/category/${id}`)
      .then(function (response) {
        setCategories(categories.filter(category => category.id !== id));
      })
      .catch((error) => {
        alert(`Error: ${error.response.data.error.message}`)
      });
  };

  const handleEditCategory = (id, newTitle) => {
    api().patch(`/category/${id}`, {
      title: newTitle,
      emoji: "home"
    })
      .then((response) => {
        const updatedCategories = categories.map((category) =>
          category.id === id ? { ...category, title: newTitle } : category
        );
        setCategories(updatedCategories);
      })
      .catch((error) => {
        alert(`Error: ${error.response.data.error.message}`)
      });;
  };

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
        Categories <IconButton onClick={handleOpenModal}><AddIcon /></IconButton>
      </Typography>

      <Grid container spacing={2}>
        {categories.map((category, index) => (
          <Grid item xs={12} key={index}>
            <CategoryCard
              iconType={category.emoji}
              title={category.title}
              count={category.count}
              onDelete={() => handleDeleteCategory(category.id)}
              onEdit={(newTitle) => handleEditCategory(category.id, newTitle)}
            />
          </Grid>
        ))}
      </Grid>
      <CategoryModal open={modalOpen} onClose={handleCloseModal} onSubmit={handleAddCategory} />
    </Container>
  );
}

export default App;
