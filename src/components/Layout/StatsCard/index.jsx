import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryIcon from '@mui/icons-material/Category';

const iconMapping = {
  link: <LinkIcon fontSize="large" />,
  favorite: <FavoriteIcon fontSize="large" />,
  delete: <DeleteIcon fontSize="large" />,
  category: <CategoryIcon fontSize="large" />,
};

const StatsCard = ({ iconType, title, count }) => (
  <Card sx={{
    borderRadius: 2,
    '&:hover': {
      boxShadow: 3,
    }
  }}>
    <CardContent sx={{ marginTop: "2rem" }}>
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
      }}>
        {iconMapping[iconType]}
      </div>
      <div style={{ height: '10vh', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{count}</Typography>
      </div>
    </CardContent>
  </Card>
);

export default StatsCard;
