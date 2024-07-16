import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import LinkForm from '../LinkForm';

const LinkModal = ({ open, onClose, onSubmit }) => (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogContent>
            <LinkForm onSubmit={onSubmit} onClose={onClose} />
        </DialogContent>
    </Dialog>
);

export default LinkModal;
