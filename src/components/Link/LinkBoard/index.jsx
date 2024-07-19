import React from 'react';
import { Grid } from '@mui/material';
import LinkCard from '../LinkCard';
import api from '../../../api';
import { useSelector } from 'react-redux';
import LinkModal from '../LinkModal';

const LinkBoard = ({ categoryId, modalOpen, handleCloseModal, links, fetchLinks }) => {
    const { userId } = useSelector(store => store.user);
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
            })
            .finally(() => {
                handleCloseModal();
            });
    };
    const handleDeleteLink = (id) => {
        api.delete(`/links/${id}?userId=${userId}`)
            .then(() => {
                fetchLinks();
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
            })
    };

    const handleFavorite = (id, isFavorite) => {
        api.patch(`links/${id}`, {
            isFavorite: isFavorite,
            userId: userId
        })
    }

    return (
        <div>
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