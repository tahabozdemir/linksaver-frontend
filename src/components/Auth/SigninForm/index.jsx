import React, { useState } from 'react';
import { Box, Button, Link, TextField, Container, Card, Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { signIn, fetchAuthSession } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchToken } from '../../../redux/userSlice'
import SignupVerification from '../SignupVerification';
import { useTranslation } from "react-i18next";

const Signin = () => {
    const { t } = useTranslation();
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('auth_signin_email_required'))
            .max(64)
            .required(t('auth_signin_email_required')),
        password: Yup.string()
            .max(64)
            .required(t('auth_signin_password_required'))
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isVerificated, setVerificated] = useState(true);
    const onSubmit = async (values) => {
        try {
            const result = await signIn({
                username: values.email,
                password: values.password,
            });
            const session = await fetchAuthSession();
            if (result.isSignedIn && session.tokens.idToken.payload.email_verified) {
                await dispatch(fetchToken());
                navigate('/');
                setVerificated(true);
            }
            else {
                setVerificated(false)
            }

        } catch (error) {
            alert(`Error: ${error}`);
        }
    };

    return (<> {
        isVerificated &&
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}
        >
            <Container component="main" maxWidth="xs">
                <Card variant="outlined" sx={{ p: 2 }}>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            onSubmit(values);
                            resetForm();
                        }}>
                        {({ errors, touched }) => (
                            <Form>
                                <h1 style={{ margin: 0, padding: 0, marginBottom: '2rem' }}>{t('auth_signin_title')}</h1>
                                <Box mb={1}>
                                    <Field
                                        name="email"
                                        as={TextField}
                                        label={t('auth_form_email')}
                                        fullWidth
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                </Box>
                                <Box mb={1}>
                                    <Field
                                        name="password"
                                        as={TextField}
                                        type="password"
                                        label={t('auth_form_password')}
                                        fullWidth
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                </Box>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    style={{ borderRadius: '0.7rem' }}
                                    sx={{ mt: 2, mb: 2, p: 1.5 }} type="submit">{t('auth_signin_button')}</Button>

                                <Link component="button" underline="none" onClick={() => { navigate('/signup') }}>{t('auth_signin_navigation')}</Link>
                            </Form>
                        )}
                    </Formik>
                </Card>
            </Container>
        </Grid>
    }
        {isVerificated === false && <SignupVerification />}
    </>
    );
};

export default Signin;
