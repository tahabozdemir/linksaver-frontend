import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import CategoryCard from '../CategoryCard';
import CategoryModal from '../CategoryModal';
import api from '../../../api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CategoryBoard = ({ modalOpen, handleCloseModal, categories, fetchCategories }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { userId } = useSelector(store => store.user);
    const navigate = useNavigate();

    const handleSnackbarOpen = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleAddCategory = (values) => {
        api
            .post('/categories', {
                userId: userId,
                title: values.category,
                emoji: 'home'
            })
            .then(() => {
                fetchCategories();
                handleSnackbarOpen('Category added successfully!');
            })
            .finally(() => {
                handleCloseModal();
            });
    };

    const handleDeleteCategory = (id) => {
        api.delete(`/categories/${id}?userId=${userId}`)
            .then(() => {
                fetchCategories();
                handleSnackbarOpen('Category deleted successfully!');
            });
    };

    const handleEditCategory = (id, newTitle) => {
        api.patch(`/categories/${id}?userId=${userId}`, {
            title: newTitle,
            emoji: "home"
        })
            .then(() => {
                fetchCategories();
                handleSnackbarOpen('Category updated successfully!');
            });
    };

    const handleNavigateLinks = (id, title) => {
        navigate('/links', { state: { categoryId: `${id}`, categoryTitle: title } });
    }

    return (
        <>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Grid container spacing={2}>
                {categories.map((category, index) => (
                    <Grid item xs={12} key={index}>
                        <CategoryCard
                            iconType={category.emoji}
                            title={category.title}
                            count={category.count}
                            onDelete={() => handleDeleteCategory(category.id)}
                            onEdit={(newTitle) => handleEditCategory(category.id, newTitle)}
                            onNavigateLinks={() => handleNavigateLinks(category.id, category.title)}
                        />
                    </Grid>
                ))}
            </Grid>
            <CategoryModal open={modalOpen} onClose={handleCloseModal} onSubmit={handleAddCategory} />
        </>
    );
}

export default CategoryBoard;
