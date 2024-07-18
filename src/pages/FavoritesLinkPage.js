import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchToken } from '../redux/userSlice.js';
import api from '../api.js';

import { Grid } from '@mui/material';
import AvatarHeader from '../components/Layout/AvatarHeader/index.jsx';
import NavBar from '../components/Layout/NavBar';
import './assets/style.css'
import LinkSearchBoard from '../components/Link/LinkSearchBoard'

const FavoritesLinkPage = () => {
    const dispatch = useDispatch();
    const { userId } = useSelector(store => store.user);
    const [links, setLinks] = useState([]);

    const fetchLinks = async () => {
        await api.get(`/users/${userId}/favorites`)
            .then((response) => {
                setLinks(response.data.data);
            });
    };

    useEffect(() => {
        dispatch(fetchToken());
    }, []);

    useEffect(() => {
        if (userId) {
            console.log('Runnnn');
            fetchLinks();
        }
    }, [userId]);

    return (
        <div>
            <Grid container spacing={2} alignItems="center">
                <AvatarHeader />
                <NavBar />
            </Grid>
            <LinkSearchBoard
                links={links}
                title={"Favorite"}
                fetchLinks={fetchLinks}
                showFavoritesCard={true}
            />
        </div>
    );
};

export default FavoritesLinkPage;
