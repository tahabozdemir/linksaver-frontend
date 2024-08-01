import React, { useState } from 'react';
import { Grid } from '@mui/material';
import LinkCard from '../LinkCard';
import api from '../../../api';
import { useSelector } from 'react-redux';
import LinkModal from '../LinkModal';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const LinkBoard = ({ categoryId, modalOpen, handleCloseModal, links, fetchLinks }) => {
    const { userId } = useSelector(store => store.user);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

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

    const handleAddLink = (values) => {
        api
            .post('/links', {
                userId: userId,
                categoryId: categoryId,
                title: values.linkTitle,
                url: values.linkUrl,
                isFavorite: false,
            })
            .then(() => {
                console.log(categoryId)
                fetchLinks();
                handleSnackbarOpen('Link added successfully!');
            })
            .finally(() => {
                handleCloseModal();
            });
    };
    const handleDeleteLink = (id) => {
        api.delete(`/links/${id}?userId=${userId}`)
            .then(() => {
                fetchLinks();
                handleSnackbarOpen('Link deleted successfully!');
            })
    };

    const handleEditLink = (id, newTitle, newUrl) => {
        api.patch(`/links/${id}`, {
            title: newTitle,
            url: newUrl,
            userId: userId
        })
            .then(() => {
                fetchLinks();
                handleSnackbarOpen('Link edited successfully!');
            })
    };

    const handleFavorite = (id, isFavorite) => {
        api.patch(`links/${id}`, {
            isFavorite: isFavorite,
            userId: userId
        })
            .then(() => {
                if (isFavorite) {
                    handleSnackbarOpen('Link favorited successfully!');
                }
            })
    }

    return (
        <div>
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
                {links.map((link, index) => (
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
            </Grid>
            <LinkModal open={modalOpen} onClose={handleCloseModal} onSubmit={handleAddLink}></LinkModal>
        </div>)
}

export default LinkBoard