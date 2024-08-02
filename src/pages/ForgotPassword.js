import React, { useState } from 'react';
import { Box, Button, Link, TextField, Container, Card, Grid, Snackbar, Alert, CircularProgress } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [loading, setLoading] = useState(false);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const requestReset = async (values) => {
        setLoading(true);
        try {
            const output = await resetPassword({ username: values.email });
            setEmail(values.email);
            const { nextStep } = output;
            if (nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
                setStep(2);
            } else if (nextStep.resetPasswordStep === 'DONE') {
                setSnackbarMessage(t('auth_forgot_password_success'));
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                navigate('/signin');
            }
        } catch (error) {
            setSnackbarMessage(t('auth_forgot_password_error'));
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const submitNewPassword = async (values) => {
        setLoading(true);
        try {
            await confirmResetPassword({
                username: email,
                confirmationCode: values.code,
                newPassword: values.password
            });
            setSnackbarMessage(t('auth_forgot_password_success'));
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            navigate('/signin');
        } catch (error) {
            setSnackbarMessage(t('auth_forgot_password_error'));
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

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
                    {step === 1 && (
                        <Formik
                            initialValues={{ email: '' }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string()
                                    .email(t('auth_signin_email_invalid'))
                                    .max(64)
                                    .required(t('auth_signin_email_required'))
                            })}
                            onSubmit={(values, { resetForm }) => {
                                requestReset(values);
                                resetForm();
                            }}>
                            {({ errors, touched }) => (
                                <Form>
                                    <h1 style={{ margin: 0, padding: 0, marginBottom: '2rem' }}>{t('auth_forgot_password_title')}</h1>
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
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        style={{ borderRadius: '0.7rem' }}
                                        sx={{ mt: 2, mb: 2, p: 1.5 }} type="submit" disabled={loading}>
                                        {loading ? <CircularProgress size={24} /> : t('auth_forgot_password_button')}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    )}
                    {step === 2 && (
                        <Formik
                            initialValues={{ code: '', password: '' }}
                            validationSchema={Yup.object().shape({
                                code: Yup.string().required(t('auth_forgot_password_code_required')),
                                password: Yup.string().required(t('auth_forgot_password_password_required'))
                            })}
                            onSubmit={(values, { resetForm }) => {
                                submitNewPassword(values);
                                resetForm();
                            }}>
                            {({ errors, touched }) => (
                                <Form>
                                    <h1 style={{ margin: 0, padding: 0, marginBottom: '2rem' }}>{t('auth_forgot_password_verification_title')}</h1>
                                    <Box mb={1}>
                                        <Field
                                            name="code"
                                            as={TextField}
                                            label={t('auth_forgot_password_code')}
                                            fullWidth
                                            error={touched.code && Boolean(errors.code)}
                                            helperText={touched.code && errors.code}
                                        />
                                    </Box>
                                    <Box mb={1}>
                                        <Field
                                            name="password"
                                            as={TextField}
                                            label={t('auth_forgot_password_new_password')}
                                            type="password"
                                            fullWidth
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                        />
                                    </Box>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        style={{ borderRadius: '0.7rem' }}
                                        sx={{ mt: 2, mb: 2, p: 1.5 }} type="submit" disabled={loading}>
                                        {loading ? <CircularProgress size={24} /> : t('auth_forgot_password_submit_button')}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    )}
                    <Link component="button" underline="none" onClick={() => navigate('/signin')}>{t('auth_forgot_back_signin')}</Link>
                </Card>
            </Container>

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
        </Grid >
    );
};

export default ForgotPassword;
