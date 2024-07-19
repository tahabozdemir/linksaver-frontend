import React, { useState } from 'react';
import { Card, CardContent, Typography, Container, Box, Link, IconButton } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';

const LinkFavoriteCard = ({ onFavorite, isFavorite, title, url }) => {
    const [newFavorite, setFavorited] = useState(isFavorite);

    const handleFavorite = () => {
        const updatedFavorite = !newFavorite;
        setFavorited(updatedFavorite);
        onFavorite(updatedFavorite);
    }

    return (
        <>
            <Card>
                <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                    </Container>
                    <IconButton onClick={handleFavorite}><FavoriteIcon sx={{ color: newFavorite ? red[500] : 'gray' }} /></IconButton>
                </CardContent>
            </Card>
        </>
    );
};

export default LinkFavoriteCard;
