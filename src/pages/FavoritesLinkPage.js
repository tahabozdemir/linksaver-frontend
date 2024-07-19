import React from 'react';

import { Grid } from '@mui/material';
import AvatarHeader from '../components/Layout/AvatarHeader/index.jsx';
import NavBar from '../components/Layout/NavBar';
import './assets/style.css'
import LinkSearchBoard from '../components/Link/LinkSearchBoard'
import FavoriteIcon from '@mui/icons-material/Favorite';

const FavoritesLinkPage = () => {
    return (
        <div>
            <Grid container spacing={2} alignItems="center">
                <AvatarHeader />
                <NavBar />
            </Grid>
            <LinkSearchBoard
                title={"Favorite Links"}
                showFavoritesCard={true}
                Icon={FavoriteIcon}
            />
        </div>
    );
};

export default FavoritesLinkPage;
