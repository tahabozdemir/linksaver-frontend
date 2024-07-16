import React, { useState, useRef } from 'react';
import { Card, CardContent, Typography, Container, IconButton, TextField, Box, Link } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { grey } from '@mui/material/colors';

const LinkCard = ({ title, url, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [newUrl, setNewUrl] = useState(url)
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

    const handleCancel = () => {
        setNewTitle(title);
        setNewUrl(url);
        setIsEditing(false);
    };

    return (
        <>
            <Card>
                <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {isEditing ? (
                            <div ref={inputRef} style={{ display: 'flex', alignItems: 'center' }}>
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
                                    style={{ marginRight: '10px' }}
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
                                    autoFocus
                                    style={{ marginRight: '10px' }}
                                />
                                <IconButton onClick={handleSave}><CheckIcon /></IconButton>
                                <IconButton onClick={handleCancel}><CloseIcon /></IconButton>
                            </div>
                        ) : (
                            <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <Box sx={{ flexGrow: 1, display: 'flex', flexWrap: 'wrap' }}>
                                    <Typography color={grey[800]} variant='h6' textAlign={'left'}>
                                        {title}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                                    <Link href={url} variant="subtitle">
                                        {url}
                                    </Link>
                                </Box>
                            </Box>
                        )}

                    </Container>
                    {!isEditing && <IconButton onClick={handleEditClick}><CreateIcon /></IconButton>}
                    <IconButton><FavoriteIcon /></IconButton>
                    <IconButton><ShareIcon /></IconButton>
                    <IconButton onClick={onDelete}><DeleteIcon /></IconButton>
                </CardContent>
            </Card>
        </>
    );
};

export default LinkCard;
