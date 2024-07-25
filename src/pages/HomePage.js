import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchToken } from '../redux/userSlice.js';
import api from '../api.js';

import { Grid, Typography, IconButton, Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AvatarHeader from '../components/Layout/AvatarHeader/index.jsx';
import NavBar from '../components/Layout/NavBar';
import StatsCard from '../components/Layout/StatsCard/index.jsx';
import CategoryBoard from '../components/Category/CategoryBoard';
import './assets/style.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
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
            <Grid container justifyContent="center" spacing={2} mt={4}>
                <Grid item xs={12} sm={6} md={6}>
                    <Link component='button' underline="none" onClick={() => { navigate('/all/links') }} className='statsCard'>
                        <StatsCard iconType="link" title="All Links" count={countAllLinks} className="statsCard" />
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Link component='button' underline="none" onClick={() => { navigate('/all/links/favorites') }} className='statsCard' >
                        <StatsCard iconType="favorite" title="Favorite Links" count={countFavorites} className="statsCard" />
                    </Link>
                </Grid>
            </Grid>
            <Typography variant="h4" mt={4} mb={2}>
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
