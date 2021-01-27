import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { SNACKBAR_DURATION } from '../commons/constants';

export default function MySnackbar({ open, onClose, severity = 'error', message }) {
  return (
    <Snackbar open={open} autoHideDuration={SNACKBAR_DURATION} onClose={onClose}>
      <MuiAlert elevation={6} variant="filled" onClose={onClose} severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
