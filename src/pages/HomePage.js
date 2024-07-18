import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchToken } from '../redux/userSlice.js';
import api from '../api.js';

import { Grid, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AvatarHeader from '../components/Layout/AvatarHeader/index.jsx';
import NavBar from '../components/Layout/NavBar';
import StatsCard from '../components/Layout/StatsCard/index.jsx';
import CategoryBoard from '../components/Category/CategoryBoard';
import './assets/style.css'

const Home = () => {
    const dispatch = useDispatch();
    const { userId } = useSelector(store => store.user);
    const [categories, setCategories] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [countAllLinks, setCountAllLinks] = useState(0);
    const [countFavorites, setCountFavorites] = useState(0);

    useEffect(() => {
        dispatch(fetchToken());
    }, []);

    useEffect(() => {
        if (userId) {
            fetchCategories();
        }
    }, [userId]);

    const fetchCategories = async () => {
        await api.get(`/categories?userId=${userId}`)
            .then((response) => {
                setCategories(response.data.data);
            })

        await api.get(`/users/${userId}/links`)
            .then((response) => {
                const all = response.data.data;
                setCountAllLinks(all.length);
            });

        await api.get(`/users/${userId}/favorites`)
            .then((response) => {
                const favorites = response.data.data;
                setCountFavorites(favorites.length)
            });
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
                    <a href='/links/all' className='statsCard'>
                        <StatsCard iconType="link" title="All Links" count={countAllLinks} className="statsCard" />
                    </a>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <a href='/links/favorites' style={{ textDecoration: 'none' }} >
                        <StatsCard iconType="favorite" title="Favorites" count={countFavorites} />
                    </a>
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
