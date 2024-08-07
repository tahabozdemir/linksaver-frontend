import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object({
  category: Yup.string().
    required('Required a Category Title')
    .min(2, 'Category Title must be at least 2 characters')
    .max(15, 'Category Title must be at most 30 characters'),
});

const CategoryForm = ({ onSubmit, onClose }) => {
  const { t } = useTranslation();
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
              inputProps={{ maxLength: 30 }}
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
