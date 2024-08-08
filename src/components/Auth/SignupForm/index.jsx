import React, { useState } from 'react';
import { Box, Button, Link, TextField, Container, Card, Grid, Snackbar, Alert } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { signUp, AuthError } from 'aws-amplify/auth';
import SignupVerification from '../SignupVerification';
import { useNavigate } from 'react-router-dom';
import '../../../config/amplify-config';
import { useTranslation } from "react-i18next";
import { SignupError } from './errorTypes.ts';

const SignupForm = ({ onSubmit }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const minCharPassword = 8
    const maxCharPassword = 128
    const minCharEmail = 6
    const maxCharEmail = 128


    const validatePassword = (value) => {
        let error;
        if (value && !/[A-Z]/.test(value)) {
            error = t('auth_signup_password_uppercase');
        } else if (value && !/[a-z]/.test(value)) {
            error = t('auth_signup_password_lowercase');
        } else if (value && !/[0-9]/.test(value)) {
            error = t('auth_signup_password_number');
        } else if (value && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            error = t('auth_signup_password_symbol');
        }
        return error;
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email(t('auth_signin_email_invalid'))
            .min(minCharEmail, t('auth_signup_email_min', { min: minCharEmail }))
            .max(maxCharEmail, t('auth_signup_email_max', { max: maxCharEmail })) //
            .required(t('auth_signin_email_required')),
        password: Yup.string()
            .min(minCharPassword, t('auth_signup_password_min', { min: minCharPassword })) //
            .max(maxCharPassword, t('auth_signup_password_max', { max: maxCharPassword })) // 
            .required(t('auth_signin_password_required')),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], t('auth_signup_password_match'))
            .max(maxCharPassword, t('auth_signup_password_max', { max: maxCharPassword })) //
            .required(t('auth_signup_confirm_password_required')),
    });

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
                <Card variant="outlined" sx={{ p: 2 }}>
                    <Formik
                        initialValues={{ email: '', password: '', confirmPassword: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            onSubmit(values);
                            resetForm();
                        }}>
                        {({ errors, touched }) => (
                            <Form>
                                <h1 style={{ margin: 0, padding: 0, marginBottom: '2rem' }}>{t('auth_signup_title')}</h1>
                                <Box mb={1}>
                                    <Field
                                        name="email"
                                        as={TextField}
                                        label={t('auth_form_email')}
                                        fullWidth
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        inputProps={{ maxLength: maxCharEmail }}
                                    />
                                </Box>
                                <Box mb={1}>
                                    <Field
                                        name="password"
                                        as={TextField}
                                        type="password"
                                        label={t('auth_form_password')}
                                        fullWidth
                                        validate={validatePassword}
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                        inputProps={{ maxLength: maxCharPassword }}
                                    />
                                </Box>
                                <Box mb={1}>
                                    <Field
                                        name="confirmPassword"
                                        as={TextField}
                                        type="password"
                                        label={t('auth_form_confirm_password')}
                                        fullWidth
                                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                        helperText={touched.confirmPassword && errors.confirmPassword}
                                        inputProps={{ maxLength: maxCharPassword }}
                                    />
                                </Box>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    style={{ borderRadius: '0.7rem' }}
                                    sx={{ mt: 2, mb: 2, p: 1.5 }} type="submit" disabled={loading}>
                                    {loading ? <CircularProgress size={24} /> : t('auth_signup_button')}
                                </Button>
                                <Link component='button' underline="none" onClick={() => { navigate('/signin') }}>
                                    {t('auth_signup_navigation')}
                                </Link>
                            </Form>
                        )}
                    </Formik>
                </Card>
            </Container>
        </Grid>
    );
};

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const { t } = useTranslation();

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleSignup = async (values) => {
        setLoading(true);
        try {
            const { nextStep } = await signUp({
                username: values.email,
                password: values.password
            });
            setStep(nextStep.signUpStep);
        } catch (error) {
            let message = '';
            switch (error.name) {
                case SignupError.USERNAME_EXISTS:
                    message = t('auth_signup_error_user_exists');
                    break;
                case SignupError.INVALID_PARAMETER:
                    message = t('auth_error_invalid_parameter');
                    break;
                default:
                    message = t('auth_signup_error_generic');
                    break;
            }

            setSnackbarMessage(message);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {step !== 'CONFIRM_SIGN_UP' && step !== 'DONE' && <SignupForm onSubmit={handleSignup} />}
            {step === 'CONFIRM_SIGN_UP' && <SignupVerification />}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Signup;