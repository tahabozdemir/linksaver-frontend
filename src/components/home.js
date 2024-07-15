import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchToken } from '../redux/tokenSlice.js';
import api from '../api.js';

import { Grid, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AvatarHeader from './AvatarHeader/index.js';
import NavBar from './NavBar/index.js';
import StatsCard from './StatsCard/index.js';
import CategoryBoard from './CategoryBoard/index.js';

const Home = () => {
    const dispatch = useDispatch();
    const { token } = useSelector(store => store.token);

    const [categories, setCategories] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchToken());
    }, []);

    useEffect(() => {
        if (token) {
            fetchCategories();
        }
    }, [token]);

    const fetchCategories = async () => {
        const userId = token.payload.username;
        await api.get(`/category?userId=${userId}`)
            .then((response) => {
                setCategories(response.data.data);
            })
    };


    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
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
            <CategoryBoard
                modalOpen={modalOpen}
                handleCloseModal={handleCloseModal}
                categories={categories}
                fetchCategories={fetchCategories}
            />
        </div>
    );
};

export default Home;
