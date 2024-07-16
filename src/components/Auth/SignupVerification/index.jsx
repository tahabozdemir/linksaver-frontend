import React, { useState, useEffect } from 'react';
import { Box, Container, Card, Grid, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const SignupVerification = () => {
    const [counter, setCounter] = useState(10);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const timer = setInterval(() => {
            setCounter((prevCounter) => prevCounter - 1);
        }, 1000);

        if (counter === 0) {
            clearInterval(timer);
            if (location.pathname === '/signin') {
                window.location.reload();
            } else {
                navigate('/signin');
            }
        }

        return () => clearInterval(timer);
    }, [counter, navigate, location]);

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}
        >
            <Container component="main" maxWidth="xs">
                <Card variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <CheckCircleOutlineIcon sx={{ fontSize: 40, color: 'green', mb: 2 }} />
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                            Verification Link Sent
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            A verification link has been sent to your email. Please check your mail.
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            Redirecting to sign-in form in {counter} seconds...
                        </Typography>
                    </Box>
                </Card>
            </Container>
        </Grid>
    );
};

export default SignupVerification;