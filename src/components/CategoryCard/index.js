import React from 'react';
import { Card, CardContent, Typography, IconButton, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CategoryCard = ({ iconType, title, count }) => (
  <Card>
    <CardContent style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
      {iconType === 'home' && <HomeIcon />}
      {iconType === 'edit' && <EditIcon />}
      <Container container spacing={10} style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h6" style={{ marginRight: '10px' }}>{title}</Typography>
        <Typography variant="h6">{count}</Typography>
      </Container>
      <IconButton><PlayArrowIcon /></IconButton>
      <IconButton><ShareIcon /></IconButton>
      <IconButton><DeleteIcon /></IconButton>
    </CardContent>
  </Card>
);

export default CategoryCard;
