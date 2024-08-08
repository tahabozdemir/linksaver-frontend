import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";


const CategoryForm = ({ onSubmit, onClose }) => {
  const { t } = useTranslation();
  const minCharTitle = 2;
  const maxCharTitle = 60;
  const validationSchema = Yup.object({
    category: Yup.string().
      required(t('category_add_title_required'))
      .min(minCharTitle, t('category_add_title_min', { min: minCharTitle }))
      .max(maxCharTitle, t('category_add_title_max', { max: maxCharTitle })),
  });
  return (
    <Formik
      initialValues={{ category: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <h2>{t('category_modal_title')}</h2>
          <Box mb={1}>
            <Field
              name="category"
              as={TextField}
              label={t('category_modal_input_placeholder')}
              fullWidth
              error={touched.category && Boolean(errors.category)}
              helperText={touched.category && errors.category}
              inputProps={{ maxLength: maxCharTitle }}
            />
          </Box>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-end", marginTop: '1rem' }}>
            <Button onClick={onClose} color='error'>{t('button_cancel_title')}</Button>
            <Button type="submit">{t('button_add_title')}</Button>
          </div>
        </Form>
      )}
    </Formik>
  )
};

export default CategoryForm;
