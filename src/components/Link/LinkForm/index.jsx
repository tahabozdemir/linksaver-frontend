import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";

const LinkForm = ({ onSubmit, onClose }) => {
    const { t } = useTranslation();
    const minCharTitle = 2;
    const maxCharTitle = 60;
    const minCharURL = 2;
    const maxCharURL = 300;
    const validationSchema = Yup.object({
        linkTitle: Yup.string()
            .required(t('link_add_title_required'))
            .min(minCharTitle, t('link_add_title_min', { min: minCharTitle }))
            .max(maxCharTitle, t('link_add_title_max', { max: maxCharTitle })),
        linkUrl: Yup.string()
            .required(t('link_add_url_required'))
            .min(minCharURL, t('link_add_url_min', { min: minCharURL }))
            .max(maxCharURL, t('link_add_url_max', { max: maxCharURL })),
    });
    return (
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
                    <h2>{t('link_modal_title')}</h2>
                    <Box mb={1}>
                        <Field
                            name="linkTitle"
                            as={TextField}
                            label={t('link_modal_input_placeholder')}
                            fullWidth
                            error={touched.linkTitle && Boolean(errors.linkTitle)}
                            helperText={touched.linkTitle && errors.linkTitle}
                            inputProps={{ maxLength: maxCharTitle }}
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
                            inputProps={{ maxLength: maxCharURL }}
                        />
                    </Box>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-end", marginTop: '1rem' }}>
                        <Button type="submit">{t('button_add_title')}</Button>
                        <Button onClick={onClose} color='error'>{t('button_cancel_title')}</Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
};


export default LinkForm;
