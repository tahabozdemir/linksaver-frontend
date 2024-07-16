import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import CategoryForm from '../CategoryForm';

const CategoryModal = ({ open, onClose, onSubmit }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogContent>
      <CategoryForm onSubmit={onSubmit} onClose={onClose} />
    </DialogContent>
  </Dialog>
);

export default CategoryModal;
