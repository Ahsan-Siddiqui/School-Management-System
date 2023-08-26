import React from 'react';
import { Snackbar, Slide } from '@mui/material';
import { Alert } from '@mui/material';

const ToastNotification = ({ open, severity, message, onClose }) => {
  const SlideTransition = (props) => <Slide {...props} direction="down" />;

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} 
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification;
