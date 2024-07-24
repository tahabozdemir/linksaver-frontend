import React from 'react';
import { Grid, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './assets/style.css'
import { signOut } from 'aws-amplify/auth';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../../redux/userSlice'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignout = async () => {
    try {
      await signOut();
      dispatch(clearUser());
      navigate('/signin');
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
