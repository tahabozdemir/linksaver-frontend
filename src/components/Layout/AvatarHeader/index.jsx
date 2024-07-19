import React from 'react';
import { Grid, Avatar, Typography } from '@mui/material';

const AvatarHeader = () => (
  <Grid container item xs={12} sm={6} md={4} alignItems={'flex-start'} marginTop={2}>
    <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" style={{ marginRight: '10px' }} />
    <Typography variant="h6">Proto Yazılım</Typography>
  </Grid>
);

export default AvatarHeader;
