import React, { useState, useEffect } from 'react';
import {
  Grid, Avatar, Typography, Button, Box, IconButton, Menu, MenuItem,
  ListItemIcon, useMediaQuery, useTheme
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import { signOut } from 'aws-amplify/auth';
import { clearUser } from '../../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import './assets/style.css';
import ConfirmationDialog from '../ConfirmationDialog';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setLang(i18n.language);
  }, [i18n.language]);

  const handleSignout = async () => {
    try {
      await signOut();
      dispatch(clearUser());
      navigate('/signin');
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const handleNavigateHomePage = () => navigate('/');

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'tr' : 'en';
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const renderDesktopMenu = () => (
    <Box>
      <Button startIcon={<HomeIcon />} onClick={handleNavigateHomePage} sx={{ color: 'black' }}>
        {t('nav_home')}
      </Button>
      <Button startIcon={<ExitToAppIcon />} onClick={handleOpenDialog} sx={{ color: 'black' }}>
        {t('nav_signout')}
      </Button>
      <Button onClick={toggleLanguage} sx={{ color: 'black' }}>
        {lang.toUpperCase()}
      </Button>
    </Box>
  );

  const renderMobileMenu = () => (
    <Box>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleNavigateHomePage}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          {t('nav_home')}
        </MenuItem>
        <MenuItem onClick={handleOpenDialog}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          {t('nav_signout')}
        </MenuItem>
        <MenuItem onClick={toggleLanguage}>
          <ListItemIcon><LanguageIcon /></ListItemIcon>
          {lang.toUpperCase()}
        </MenuItem>
      </Menu>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, padding: '10px' }} mt={3}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={6} md={4} container alignItems="center">
          <Avatar alt="Proto" sx={{ marginRight: '10px' }} />
          <Typography variant="h6" onClick={handleNavigateHomePage} sx={{ cursor: 'pointer' }}>
            Proto Yazılım
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={8} container justifyContent="flex-end" spacing={1}>
          {isSmallScreen ? renderMobileMenu() : renderDesktopMenu()}
        </Grid>
      </Grid>
      <ConfirmationDialog
        open={openDialog}
        title={t('confirm_signout_title')}
        body={t('confirm_signout_message')}
        confirmButtonText={t('confirm_signout_confirm_button')}
        closeButtonText={t('button_cancel_title')}
        onClose={handleCloseDialog}
        onConfirm={() => { handleCloseDialog(); handleSignout(); }}
      />
    </Box>
  );
};

export default NavBar;