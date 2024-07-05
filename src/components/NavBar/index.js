import React from 'react';
import { Grid, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './assets/style.css'

const NavBar = () => (
  <Grid item xs={12} sm={6} md={8} container justifyContent="flex-end" spacing={1}>
    <Grid item>
      <Button startIcon={<HomeIcon />} variant="outlined" color='primary' className='Button'>Home</Button>
    </Grid>
    <Grid item>
      <Button startIcon={<SettingsIcon />} variant="outlined" className='Button'>Settings</Button>
    </Grid>
    <Grid item>
      <Button startIcon={<ExitToAppIcon />} variant="outlined">Signout</Button>
    </Grid>
  </Grid>
);

export default NavBar;
