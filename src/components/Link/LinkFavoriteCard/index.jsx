import React, { useState } from 'react';
import { Card, CardContent, Typography, Container, Box, Link, IconButton, Tooltip } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';

const LinkFavoriteCard = ({ onFavorite, isFavorite, title, url }) => {
    const [newFavorite, setFavorited] = useState(isFavorite);

    const handleFavorite = () => {
        const updatedFavorite = !newFavorite;
        setFavorited(updatedFavorite);
        onFavorite(updatedFavorite);
    }

    const handleOpenLink = () => {
        window.open(url, '_blank');
    }

    return (
        <Card
            onClick={handleOpenLink}
            sx={{
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': { boxShadow: 3 }
            }}
        >
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography color={grey[800]} variant='h6' sx={{
                        textOverflow: 'ellipsis',
                        textDecoration: 'none',
                    }}>
                        {title}
                    </Typography>
                    <Link
                        variant="body2"
                        sx={{
                            textOverflow: 'ellipsis',
                            textDecoration: 'none',
                        }}
                    >
                        {url}
                    </Link>
                </Box>
                <IconButton
                    onClick={(e) => { e.stopPropagation(); handleFavorite(); }}
                    sx={{ ml: 1 }}
                >
                    <FavoriteIcon sx={{ color: newFavorite ? red[500] : grey[400] }} />
                </IconButton>
            </CardContent>
        </Card>
    );
};

export default LinkFavoriteCard;
