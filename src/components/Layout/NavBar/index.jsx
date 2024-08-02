import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './assets/style.css'
import { signOut } from 'aws-amplify/auth';
import { clearUser } from '../../../redux/userSlice'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lang, changeLang] = useState('');
  const handleSignout = async () => {
    try {
      await signOut();
      dispatch(clearUser());
      navigate('/signin');
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  useEffect(() => {
    changeLang(i18n.language)
  }, []);

  const handleNavigateHomePage = () => {
    navigate('/')
  }

  const { t, i18n } = useTranslation()

  return (
    <Grid container justifyContent="flex-end" spacing={1}>
      <Grid item xs={12} sm={6} md={8} container justifyContent="flex-end" spacing={1} >
        <Grid item>
          <Button startIcon={<HomeIcon />} onClick={handleNavigateHomePage} sx={{ color: 'black' }}>{t('nav_home')}</Button>
        </Grid>
        <Grid item>
          <Button startIcon={<ExitToAppIcon />} onClick={handleSignout} sx={{ color: 'black' }}>{t('nav_signout')}</Button>
        </Grid>
        <Grid item>
          <Button onClick={() => { i18n.changeLanguage(i18n.language === 'en' ? 'tr' : 'en'); changeLang(i18n.language) }} sx={{ color: 'black' }}>{lang}</Button>
        </Grid>
      </Grid >
    </Grid>
  )
};

export default NavBar;
