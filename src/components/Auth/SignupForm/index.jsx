import React, { useState } from 'react';
import { Box, Button, Link, TextField, Container, Card, Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { signUp } from "aws-amplify/auth";
import SignupVerification from '../SignupVerification';
import { useNavigate } from 'react-router-dom';
import '../../../config/amplify-config'

const SignupForm = ({ onSubmit }) => {
    const navigate = useNavigate();
    const validatePassword = (value) => {
        let error;
        if (value && !/[A-Z]/.test(value)) {
            error = 'Password must contain at least one uppercase letter!';
        } else if (value && !/[a-z]/.test(value)) {
            error = 'Password must contain at least one lowercase letter!';
        } else if (value && !/[0-9]/.test(value)) {
            error = 'Password must contain at least one number!';
        } else if (value && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            error = 'Password must contain at least one symbol!';
        }
        return error;
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Email is invalid!")
            .max(64)
            .required("Required an Email!"),
        password: Yup.string()
            .min(8, "Password must be 8 characters at least!")
            .max(64)
            .required("Required a Password!"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "Passwords must match!")
            .max(64)
            .required("Required to confirm password!"),
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
                                <h1 style={{ margin: 0, padding: 0, marginBottom: '2rem' }}>Sign up</h1>
                                <Box mb={1}>
                                    <Field
                                        name="email"
                                        as={TextField}
                                        label="Email"
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
                                        label="Password"
                                        fullWidth
                                        validate={validatePassword}
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                </Box>
                                <Box mb={1}>
                                    <Field
                                        name="confirmPassword"
                                        as={TextField}
                                        type="password"
                                        label="Confirm Password"
                                        fullWidth
                                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                        helperText={touched.confirmPassword && errors.confirmPassword}
                                    />
                                </Box>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    style={{ borderRadius: '0.7rem' }}
                                    sx={{ mt: 2, mb: 2, p: 1.5 }} type="submit">Create Account</Button>

                                <Link component='button' underline="none" onClick={() => { navigate('/signin') }}>Already have an account?</Link>
                            </Form>
                        )}
                    </Formik>
                </Card>
            </Container>
        </Grid>
    );
};

const Signup = () => {
    const [step, setStep] = useState('');
    const handleSignup = async (values) => {
        try {
            const { nextStep } = await signUp({
                username: values.email,
                password: values.password
            });
            setStep(nextStep.signUpStep);
        } catch (error) {
            alert(`Error: ${error}`);
        }
    };

    return (
        <div>
            {step !== 'CONFIRM_SIGN_UP' && step !== 'DONE' && <SignupForm onSubmit={handleSignup} />}
            {step === 'CONFIRM_SIGN_UP' && <SignupVerification />}
        </div>
    );
};

export default Signup;
