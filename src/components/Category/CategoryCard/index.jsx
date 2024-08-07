import React, { useState, useRef } from 'react';
import { Card, CardContent, Typography, Container, Box, IconButton, TextField } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CreateIcon from '@mui/icons-material/Create';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const CategoryCard = ({ iconType, title, count, onDelete, onEdit, onNavigateLinks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <Card
      onClick={onNavigateLinks}
      sx={{
        cursor: 'pointer',
        borderRadius: 2,
        '&:hover': {
          boxShadow: 3,
        },
        width: '100%',
        marginBottom: isMobile ? 2 : 0,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? 2 : 3,
        }}
      >
        {iconType === 'home' && <HomeIcon />}
        {iconType === 'edit' && <EditIcon />}
        <Container
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: isMobile ? 'center' : 'left',
            width: 'auto',
          }}
        >
          {isEditing ? (
            <Box ref={inputRef} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: isMobile ? 'column' : 'row', width: '100%' }}>
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
                variant="outlined"
                fullWidth={isMobile}
                sx={{ marginBottom: isMobile ? 1 : 0, marginTop: 1 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 1 }}>
                <IconButton onClick={(e) => { handleStopPropagation(e); handleSave(); }} color="primary"><CheckIcon /></IconButton>
                <IconButton onClick={(e) => { handleStopPropagation(e); handleCancel(); }} color="error"><CloseIcon /></IconButton>
              </Box>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h6"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginBottom: isMobile ? 1 : 0,
                  marginRight: isMobile ? 0 : 1,
                }}
              >
                {title}
              </Typography>
              <Typography variant="h6">{count}</Typography>
            </Box>
          )}
        </Container>
        {!isEditing && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            <IconButton onClick={(e) => { handleStopPropagation(e); handleEditClick(); }}><CreateIcon /></IconButton>
            <IconButton onClick={(e) => { handleStopPropagation(e); onNavigateLinks(); }}><PlayArrowIcon /></IconButton>
            <IconButton onClick={(e) => { handleStopPropagation(e); onDelete(); }}><DeleteIcon /></IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
