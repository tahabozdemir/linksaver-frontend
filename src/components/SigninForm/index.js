import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { signIn, signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Email is invalid!")
        .max(64)
        .required("Required an Email!"),
    password: Yup.string()
        .max(64)
        .required("Required a Password!")
});

const Signin = () => {
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            const result = await signIn({
                username: values.email,
                password: values.password,
            });
            console.log(result);

            if (result.isSignedIn) {
                navigate('/');
                const user = await getCurrentUser();
                const session = await fetchAuthSession();

                console.log(user);
                console.log("id token", session.tokens.idToken);
                console.log("access token", session.tokens.accessToken);
            }

        } catch (error) {
            alert(`Error: ${error}`);
        }
    };

    const handleSignout = async () => {
        try {
            const result = await signOut();
            alert('Success Sign out');
            console.log(result);
        } catch (error) {
            alert(`Error: ${error}`);
        }
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                onSubmit(values);
                resetForm();
            }}>
            {({ errors, touched }) => (
                <Form>
                    <h2>Sign In</h2>
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
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                        />
                    </Box>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-end", marginTop: '1rem' }}>
                        <Button type="submit">Sign In</Button>
                        <Button onClick={handleSignout}>Sign Out</Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Signin;
