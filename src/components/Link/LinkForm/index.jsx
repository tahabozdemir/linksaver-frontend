import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    linkTitle: Yup.string()
        .required('Required a Link Title')
        .min(2, 'Link Title must be at least 2 characters')
        .max(50, 'Link Title must be at most 30 characters'),
    linkUrl: Yup.string()
        .required('Required a Link')
        .max(300, 'Link Title must be at most 300 characters')
});

const LinkForm = ({ onSubmit, onClose }) => (
    <Formik
        initialValues={{ linkTitle: '', link: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm();
        }}
    >
        {({ errors, touched }) => (
            <Form>
                <h2>Add New Link</h2>
                <Box mb={1}>
                    <Field
                        name="linkTitle"
                        as={TextField}
                        label="Link Title"
                        fullWidth
                        error={touched.linkTitle && Boolean(errors.linkTitle)}
                        helperText={touched.linkTitle && errors.linkTitle}
                    />
                </Box>
                <Box mb={1}>
                    <Field
                        name="linkUrl"
                        as={TextField}
                        label="URL Link"
                        fullWidth
                        error={touched.linkUrl && Boolean(errors.linkUrl)}
                        helperText={touched.linkUrl && errors.linkUrl}
                    />
                </Box>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-end", marginTop: '1rem' }}>
                    <Button type="submit">Add</Button>
                    <Button onClick={onClose} color='error'>Cancel</Button>
                </div>
            </Form>
        )}
    </Formik>
);

export default LinkForm;
