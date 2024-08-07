import React from 'react';

import { Grid } from '@mui/material';
import NavBar from '../components/Layout/NavBar';
import './assets/style.css'
import LinkSearchBoard from '../components/Link/LinkSearchBoard'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTranslation } from "react-i18next";

const FavoritesLinkPage = () => {
    const { t } = useTranslation();
    return (
        <div>
            <Grid container spacing={2} alignItems="center">
                <NavBar />
            </Grid>
            <LinkSearchBoard
                title={t('card_favorite_links')}
                showFavoritesCard={true}
                Icon={FavoriteIcon}
            />
        </div>
    );
};

export default FavoritesLinkPage;
