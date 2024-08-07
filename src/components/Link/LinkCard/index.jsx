import React, { useState, useRef } from 'react';
import { Card, CardContent, Typography, Box, IconButton, TextField, Link } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { grey, red } from '@mui/material/colors';

const LinkCard = ({ title, url, isFavorite, onDelete, onEdit, onFavorite }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [newUrl, setNewUrl] = useState(url);
    const [newFavorite, setFavorited] = useState(isFavorite);
    const inputRef = useRef(null);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (newTitle.length >= 3 && newTitle.length <= 50) {
            onEdit(newTitle, newUrl);
            setIsEditing(false);
        }
    };

    const handleOpenLink = () => {
        window.open(url, '_blank');
    }

    const handleCancel = () => {
        setNewTitle(title);
        setNewUrl(url);
        setIsEditing(false);
    };

    const handleFavorite = () => {
        const updatedFavorite = !newFavorite;
        setFavorited(updatedFavorite);
        onFavorite(updatedFavorite);
    };

    return (
        <Card onClick={handleOpenLink} sx={{
            width: '100%',
            borderRadius: 2,
            cursor: 'pointer',
            '&:hover': {
                boxShadow: 3,
            }
        }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: 3 }}>
                {isEditing ? (
                    <Box ref={inputRef} sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <TextField
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    handleSave();
                                }
                            }}
                            inputProps={{ maxLength: 50 }}
                            autoFocus
                            fullWidth
                            sx={{ marginBottom: 2 }}
                            variant="outlined"
                            label="Title"
                        />
                        <TextField
                            value={newUrl}
                            onChange={(e) => setNewUrl(e.target.value)}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    handleSave();
                                }
                            }}
                            inputProps={{ maxLength: 300 }}
                            fullWidth
                            sx={{ marginBottom: 2 }}
                            variant="outlined"
                            label="URL"
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <IconButton onClick={(e) => { e.stopPropagation(); handleSave(); }} color="primary"><CheckIcon /></IconButton>
                            <IconButton onClick={(e) => { e.stopPropagation(); handleCancel(); }} color="error"><CloseIcon /></IconButton>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <Typography
                            color={grey[800]}
                            variant='h6'
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                marginBottom: 1,
                            }}
                        >
                            {title}
                        </Typography>
                        <Link
                            variant="body2"
                            sx={{
                                display: 'block',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                textDecoration: 'none',
                                marginBottom: 2,
                            }}
                        >
                            {url}
                        </Link>
                    </Box>
                )}
                {!isEditing && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <IconButton onClick={(e) => { e.stopPropagation(); handleEditClick(); }}><CreateIcon /></IconButton>
                        <IconButton onClick={(e) => { e.stopPropagation(); handleFavorite(); }}>
                            <FavoriteIcon sx={{ color: newFavorite ? red[500] : grey }} />
                        </IconButton>
                        <IconButton onClick={(e) => { e.stopPropagation(); onDelete(); }}><DeleteIcon /></IconButton>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default LinkCard;
