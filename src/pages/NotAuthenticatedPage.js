import React from 'react';
import './assets/style.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const NotAuthenticatedPage = () => {
    const { t } = useTranslation();
    return (
        <div className="page-container">
            <h1>{t('not_auth_title')}</h1>
            <p>{t('not_auth_body')}</p>
            <div style={{ marginTop: '20px' }}>
                <Button
                    component={Link}
                    to="/signin"
                    variant="contained"
                    color="primary"
                    style={{ marginRight: '10px' }}
                >
                    {t('auth_signin_button')}
                </Button>
                <Button
                    component={Link}
                    to="/signup"
                    variant="outlined"
                    color="primary"
                >
                    {t('auth_signup_button')}
                </Button>
            </div>
        </div>
    );
};

export default NotAuthenticatedPage;