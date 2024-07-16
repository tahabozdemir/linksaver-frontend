import React from 'react';
import { Grid } from '@mui/material';
import CategoryCard from '../CategoryCard';
import CategoryModal from '../CategoryModal';
import api from '../../../api'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CategoryBoard = ({ modalOpen, handleCloseModal, categories, fetchCategories }) => {
    const { userId } = useSelector(store => store.user);
    const navigate = useNavigate();

    const handleAddCategory = (values) => {
        api
            .post('/category', {
                userId: userId,
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
        api.delete(`/category/${id}?userId=${userId}`)
            .then(() => {
                fetchCategories();
            })
    };

    const handleEditCategory = (id, newTitle) => {
        api.patch(`/category/${id}?userId=${userId}`, {
            title: newTitle,
            emoji: "home"
        })
            .then(() => {
                fetchCategories();
            })
    };

    const handleNavigateLinks = (id, title) => {
        navigate('/links', { state: { categoryId: `${id}`, categoryTitle: title } });
    }

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
                        onNavigateLinks={() => handleNavigateLinks(category.id, category.title)}
                    />
                </Grid>
            ))}
        </Grid>
        <CategoryModal open={modalOpen} onClose={handleCloseModal} onSubmit={handleAddCategory} />
    </>);
}

export default CategoryBoard;