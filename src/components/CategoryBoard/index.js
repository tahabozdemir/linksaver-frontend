import React from 'react';
import { Grid } from '@mui/material';
import CategoryCard from '../CategoryCard';
import CategoryModal from '../CategoryModal';
import api from '../../api'
import { useSelector } from 'react-redux';

const CategoryBoard = ({ modalOpen, handleCloseModal, categories, fetchCategories }) => {
    const { token } = useSelector(store => store.token)

    const handleAddCategory = (values) => {
        api
            .post('/category', {
                userId: token.payload.sub,
                title: values.category,
                emoji: 'home'
            })
            .then(() => {
                fetchCategories();
            })
            .finally(() => {
                handleCloseModal();
            });
    };

    const handleDeleteCategory = (id) => {
        api.delete(`/category/${id}`, {
            data: { userId: token.payload.username },
        })
            .then(() => {
                fetchCategories();
            })
    };

    const handleEditCategory = (id, newTitle) => {
        api.patch(`/category/${id}?userId=${token.payload.username}`, {
            title: newTitle,
            emoji: "home"
        })
            .then(() => {
                fetchCategories();
            })
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