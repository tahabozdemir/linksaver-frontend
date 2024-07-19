import React, { useState, useEffect } from 'react';
import { Grid, TextField, Typography, Container } from '@mui/material';
import api from '../../../api';
import LinkCard from '../LinkCard';
import { fetchToken } from '../../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import LinkFavoriteCard from '../LinkFavoriteCard';



const LinkSearchBoard = ({ showFavoritesCard, title, Icon }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { userId } = useSelector(store => store.user);
    const [filteredLinks, setFilteredLinks] = useState([]);
    const [links, setLinks] = useState([]);
    const dispatch = useDispatch();


    const fetchLinks = async () => {
        if (showFavoritesCard) {
            await api.get(`/users/${userId}/favorites`)
                .then((response) => {
                    setFilteredLinks(response.data.data)
                });
        } else {
            await api.get(`/users/${userId}/links`)
                .then((response) => {
                    setFilteredLinks(response.data.data);
                });
        };
    }

    useEffect(() => {
        dispatch(fetchToken());
    }, []);

    useEffect(() => {
        if (userId) {
            fetchLinks();
        }
    }, [userId]);


    const handleDeleteLink = (id) => {
        api.delete(`/links/${id}?userId=${userId}`)
            .then(() => {
                fetchLinks();
            })
    };

    const handleEditLink = (id, newTitle, newUrl) => {
        api.patch(`/links/${id}`, {
            userId: userId,
            title: newTitle,
            url: newUrl
        })
            .then(() => {
                fetchLinks();
            })
    };

    const handleFavorite = (id, isFavorite) => {
        api.patch(`/links/${id}`, {
            userId: userId,
            isFavorite: isFavorite
        })
    }

    const handleSearchLinks = (title) => {
        api.get(`/users/${userId}/links/search?title=${title}`)
            .then((response) => {
                setFilteredLinks(response.data.data)
            })
    }

    const handleSearchFavoriteLinks = (title) => {
        api.get(`/users/${userId}/favorites/search?title=${title}`)
            .then((response) => {
                setFilteredLinks(response.data.data)
            })
    }

    useEffect(() => {
        if (searchTerm && userId) {
            const timeoutMs = 500;
            if (showFavoritesCard) {
                const handleSearch = setTimeout(() => {
                    handleSearchFavoriteLinks(searchTerm);
                }, timeoutMs);
                return () => clearTimeout(handleSearch);
            } else {
                const handleSearch = setTimeout(() => {
                    handleSearchLinks(searchTerm);
                }, timeoutMs)
                return () => clearTimeout(handleSearch);
            }
        } else {
            if (userId) {
                fetchLinks();
            }
        }
    }, [searchTerm, showFavoritesCard, links]);

    const Card = () => {
        if (showFavoritesCard) {
            return (<Grid container spacing={2}>
                {filteredLinks.map((link, index) => (
                    <Grid item xs={12} key={index}>
                        <LinkFavoriteCard
                            title={link.title}
                            url={link.url}
                            isFavorite={link.isFavorite}
                            onFavorite={(isFavorite) => handleFavorite(link.id, isFavorite)}
                        />
                    </Grid>
                ))}
            </Grid>)
        }
        else {
            return (<Grid container spacing={2}>
                {filteredLinks.map((link, index) => (
                    <Grid item xs={12} key={index}>
                        <LinkCard
                            title={link.title}
                            url={link.url}
                            isFavorite={link.isFavorite}
                            onDelete={() => handleDeleteLink(link.id)}
                            onEdit={(newTitle, newUrl) => handleEditLink(link.id, newTitle, newUrl)}
                            onFavorite={(isFavorite) => handleFavorite(link.id, isFavorite)}
                        />
                    </Grid>
                ))}
            </Grid>)
        }
    }
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '3rem', marginBottom: '1rem' }}>
                <Icon style={{ marginRight: '1rem' }} fontSize="large" />
                <Typography variant="h4">
                    {title}
                </Typography>
            </div>
            <TextField
                fullWidth
                label="Search links by title"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value)
                }}
                sx={{ marginBottom: '1.5rem' }}
            />
            <Card />
        </div>
    );
};
export default LinkSearchBoard;