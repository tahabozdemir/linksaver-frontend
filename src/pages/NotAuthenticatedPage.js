import React from 'react';
import './assets/style.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotAuthenticatedPage = () => {
    return (
        <div className="page-container">
            <h1>Not Authenticated</h1>
            <p>Please sign in to access this content.</p>
            <div style={{ marginTop: '20px' }}>
                <Button
                    component={Link}
                    to="/signin"
                    variant="contained"
                    color="primary"
                    style={{ marginRight: '10px' }}
                >
                    Sign In
                </Button>
                <Button
                    component={Link}
                    to="/signup"
                    variant="outlined"
                    color="primary"
                >
                    Sign Up
                </Button>
            </div>
        </div>
    );
};

export default NotAuthenticatedPage;