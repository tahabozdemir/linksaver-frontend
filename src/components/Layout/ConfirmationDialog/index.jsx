import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ConfirmationDialog = ({ open, onClose, onConfirm, title, body, confirmButtonText, closeButtonText }) => {
    const { t } = useTranslation();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <Typography sx={{ fontWeight: 'bold' }} variant="h5" component="h2">
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant='body1'>
                    {body}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">
                    {closeButtonText}
                </Button>
                <Button onClick={onConfirm} color="primary">
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;