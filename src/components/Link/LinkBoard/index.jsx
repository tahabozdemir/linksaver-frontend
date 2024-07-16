import React from 'react';
import { Grid } from '@mui/material';
import LinkCard from '../LinkCard';
import api from '../../../api';
import { useSelector } from 'react-redux';
import LinkModal from '../LinkModal';

const LinkBoard = ({ categoryId, modalOpen, handleCloseModal, links, fetchLinks }) => {
    const handleAddLink = (values) => {
        api
            .post('/links', {
                categoryId: categoryId,
                title: values.linkTitle,
                url: values.linkUrl,
                isFavorite: false,
                isDelete: false
            })
            .then(() => {
                fetchLinks();
            })
            .finally(() => {
                handleCloseModal();
            });
    };
    const handleDeleteLink = (id) => {
        api.delete(`/links/${id}?categoryId=${categoryId}`)
            .then(() => {
                fetchLinks();
            })
    };

    const handleEditLink = (id, newTitle, newUrl) => {
        api.patch(`/links/${id}`, {
            title: newTitle,
            url: newUrl
        })
            .then(() => {
                fetchLinks();
            })
    };

    return (
        <div>
            <Grid container spacing={2}>
                {links.map((link, index) => (
                    <Grid item xs={12} key={index}>
                        <LinkCard
                            title={link.title}
                            url={link.url}
                            onDelete={() => handleDeleteLink(link.id)}
                            onEdit={(newTitle, newUrl) => handleEditLink(link.id, newTitle, newUrl)}
                        />
                    </Grid>
                ))}
            </Grid>
            <LinkModal open={modalOpen} onClose={handleCloseModal} onSubmit={handleAddLink}></LinkModal>
        </div>)
}

export default LinkBoard