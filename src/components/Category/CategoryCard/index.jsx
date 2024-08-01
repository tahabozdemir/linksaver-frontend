import React, { useState, useRef } from 'react';
import { Card, CardContent, Typography, Container, IconButton, TextField } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';


const CategoryCard = ({ iconType, title, count, onDelete, onEdit, onNavigateLinks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newTitle.length >= 2 && newTitle.length <= 35) {
      onEdit(newTitle);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNewTitle(title);
    setIsEditing(false);
  };

  return (
    <>
      <Card onClick={onNavigateLinks} sx={{
        cursor: 'pointer', '&:hover': {
          boxShadow: 3,
        },
      }} >
        <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {iconType === 'home' && <HomeIcon />}
          {iconType === 'edit' && <EditIcon />}
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
                  inputProps={{ maxLength: 35 }}
                  autoFocus
                  style={{ marginRight: '10px' }}
                />
                <IconButton onClick={(e) => { e.stopPropagation(); handleSave(); }}><CheckIcon /></IconButton>
                <IconButton onClick={(e) => { e.stopPropagation(); handleCancel(); }}><CloseIcon /></IconButton>
              </div>
            ) : (
              <Typography
                variant="h6"
                style={{ marginRight: '10px' }}
              >
                {title}
              </Typography>
            )}
            <Typography variant="h6">{count}</Typography>
          </Container>
          {!isEditing && <IconButton onClick={(e) => { e.stopPropagation(); handleEditClick(); }}><CreateIcon /></IconButton>}
          <IconButton onClick={(e) => { e.stopPropagation(); onNavigateLinks(); }}><PlayArrowIcon /></IconButton>
          <IconButton onClick={(e) => { e.stopPropagation(); }}><ShareIcon /></IconButton>
          <IconButton onClick={(e) => { e.stopPropagation(); onDelete(); }}><DeleteIcon /></IconButton>
        </CardContent>
      </Card>
    </>
  );
};

export default CategoryCard;
