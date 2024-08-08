import React from 'react';
import { Grid } from '@mui/material';
import NavBar from '../components/Layout/NavBar';
import './assets/style.css';
import LinkSearchBoard from '../components/Link/LinkSearchBoard';
import LinkIcon from '@mui/icons-material/Link';
import { useTranslation } from "react-i18next";

const AllLinksPage = () => {
    const { t } = useTranslation();
    return (
        <div>
            <Grid container spacing={2} alignItems="center">
                <NavBar />
            </Grid>
            <LinkSearchBoard
                title={t('card_all_links')}
                Icon={LinkIcon} />
        </div>
    );
};

export default AllLinksPage;
