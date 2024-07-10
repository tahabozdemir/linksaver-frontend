import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { signUp } from "aws-amplify/auth";
import { confirmSignUp } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ onSubmit }) => {
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
        <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                onSubmit(values);
                resetForm();
            }}>
            {({ errors, touched }) => (
                <Form>
                    <h2>Signup Form</h2>
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", marginTop: '1rem' }}>
                        <Button type="submit">Signup</Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};


const SignupVerificationForm = ({ onSubmit }) => {
    const verificationValidationSchema = Yup.object({
        code: Yup.string()
            .required("Required verification code for registration")
            .max(6, "Verification code must be 6")
            .min(6, "Verification code must be 6")
    });

    return (
        <Formik
            initialValues={{ code: '' }}
            validationSchema={verificationValidationSchema}
            onSubmit={(values, { resetForm }) => {
                onSubmit(values)
                resetForm();
            }}>
            {({ errors, touched }) => (
                <Form>
                    <h2>Verification Code</h2>
                    <Box mb={1}>
                        <Field
                            name="code"
                            as={TextField}
                            label="Verification Code"
                            fullWidth
                            error={touched.code && Boolean(errors.code)}
                            helperText={touched.code && errors.code}
                        />
                    </Box>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", marginTop: '1rem' }}>
                        <Button type="submit">Send Code</Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
};

const Signup = () => {
    const [step, setStep] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const confirm = localStorage.getItem('linksaver.email.isConfirm');
        if (confirm) {
            setStep('CONFIRM_SIGN_UP');
        }
    }, []);

    const handleSignup = async (values) => {
        try {
            const result = await signUp({
                username: values.email,
                password: values.password
            });
            setStep(result.nextStep.signUpStep);
            localStorage.setItem('linksaver.email.isConfirm', result.isSignUpComplete);
            localStorage.setItem('linksaver.email', values.email);
        } catch (error) {
            alert(`Error: ${error}`);
        }
    };

    const handleVerify = async (values) => {
        try {
            const result = await confirmSignUp({
                username: localStorage.getItem('linksaver.email'),
                confirmationCode: values.code
            });
            setStep(result.nextStep.signUpStep);
            localStorage.removeItem('linksaver.email');
            localStorage.removeItem('linksaver.email.isConfirm');
            if (result.nextStep.isSignUpComplete) {
                navigate('/')
            }
        } catch (error) {
            alert(`Error: ${error}`);
        }
    };

    return (
        <div>
            {step !== 'CONFIRM_SIGN_UP' && step !== 'DONE' && <SignupForm onSubmit={handleSignup} />}
            {step === 'CONFIRM_SIGN_UP' && <SignupVerificationForm onSubmit={handleVerify} />}
        </div>
    );
};

export default Signup;
