import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToken } from '../redux/userSlice.js';
import api from '../api.js';
import { Grid, Typography, IconButton } from '@mui/material';
import NavBar from '../components/Layout/NavBar/index.jsx';
import AddIcon from '@mui/icons-material/Add';
import LinkBoard from '../components/Link/LinkBoard';
import { useLocation } from 'react-router-dom';

const LinkPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { userId } = useSelector(store => store.user);
    const [links, setLinks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const storedCategoryId = localStorage.getItem(`linksaver.${userId}.categoryId`);
    const storedCategoryTitle = localStorage.getItem(`linksaver.${userId}.categoryTitle`);
    const { categoryId, categoryTitle } = location.state || { categoryId: storedCategoryId, categoryTitle: storedCategoryTitle };

    useEffect(() => {
        if (categoryId) {
            localStorage.setItem(`linksaver.${userId}.categoryId`, categoryId);
        }
        if (categoryTitle) {
            localStorage.setItem(`linksaver.${userId}.categoryTitle`, categoryTitle);
        }
    }, [categoryId, categoryTitle]);

    useEffect(() => {
        dispatch(fetchToken());
    }, []);

    useEffect(() => {
        if (userId) {
            fetchLinks();
        }
    }, [userId, categoryId]);

    const fetchLinks = async () => {
        await api.get(`/categories/${categoryId}/links`)
            .then((response) => {
                setLinks(response.data.data);
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
                <NavBar />
            </Grid>
            <Typography variant="h4" mt={4} mb={2}>
                {categoryTitle}
                <IconButton onClick={handleOpenModal}><AddIcon /></IconButton>
            </Typography>
            <LinkBoard
                categoryId={categoryId}
                modalOpen={modalOpen}
                handleCloseModal={handleCloseModal}
                links={links}
                fetchLinks={fetchLinks}
            />
        </div>
    );
};

export default LinkPage;
