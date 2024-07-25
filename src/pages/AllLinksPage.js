import React from 'react';
import { Grid } from '@mui/material';
import AvatarHeader from '../components/Layout/AvatarHeader/index.jsx';
import NavBar from '../components/Layout/NavBar';
import './assets/style.css';
import LinkSearchBoard from '../components/Link/LinkSearchBoard';
import LinkIcon from '@mui/icons-material/Link';

const AllLinksPage = () => {
    return (
        <div>
            <Grid container spacing={2} alignItems="center">
                <AvatarHeader />
                <NavBar />
            </Grid>
            <LinkSearchBoard
                title={"All Links"}
                Icon={LinkIcon} />
        </div>
    );
};

export default AllLinksPage;
