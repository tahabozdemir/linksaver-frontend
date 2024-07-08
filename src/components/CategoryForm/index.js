import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  category: Yup.string().
    required('Required a Category Title')
    .min(2, 'Category Title must be at least 2 characters')
    .max(15, 'Category Title must be at most 15 characters'),
});

const CategoryForm = ({ onSubmit, onClose }) => (
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
        <h2>Add New Category</h2>
        <Box mb={1}>
          <Field
            name="category"
            as={TextField}
            label="Category Title"
            fullWidth
            error={touched.category && Boolean(errors.category)}
            helperText={touched.category && errors.category}
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

export default CategoryForm;
