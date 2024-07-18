import React from 'react';
import { Grid, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './assets/style.css'
import { signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { purple, red } from '@mui/material/colors';

const NavBar = () => {
  const navigate = useNavigate();
  const handleSignout = async () => {
    try {
      await signOut();
      navigate('/signin');
      alert('Success Sign out');
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const handleNavigateHomePage = () => {
    navigate('/')
  }

  return (
    <Grid item xs={12} sm={6} md={8} container justifyContent="flex-end" spacing={1}>
      <Grid item>
        <Button startIcon={<HomeIcon />} onClick={handleNavigateHomePage} sx={{ color: 'black' }}>Home</Button>
      </Grid>
      <Grid item>
        <Button startIcon={<ExitToAppIcon />} onClick={handleSignout} sx={{ color: 'black' }}>Sign Out</Button>
      </Grid>
    </Grid>
  )
};

export default NavBar;
