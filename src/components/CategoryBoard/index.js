import React from 'react';
import { Grid } from '@mui/material';
import CategoryCard from '../CategoryCard';
import CategoryModal from '../CategoryModal';
import { api } from '../../api'

const CategoryBoard = ({ modalOpen, handleCloseModal, categories, fetchCategories }) => {
    const handleAddCategory = (values) => {
        api()
            .post('/category', {
                title: values.category,
                emoji: 'home'
            })
            .then(() => {
                fetchCategories();
            })
            .catch((error) => {
                alert(`Error: ${error.response.data.error.message}`)
            })
            .finally(() => {
                handleCloseModal();
            });
    };

    const handleDeleteCategory = (id) => {
        api().delete(`/category/${id}`)
            .then(() => {
                fetchCategories();
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
            .then(() => {
                fetchCategories();
            })
            .catch((error) => {
                alert(`Error: ${error.response.data.error.message}`)
            });;
    };

    return (<>
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
    </>);
}

export default CategoryBoard;