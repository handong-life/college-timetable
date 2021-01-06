import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modal: {
    outline: 0,
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  titleText: {
    marginBottom: '15px',
  },

  inputBox: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingLeft: '8px',
    marginBottom: '15px',
    borderRadius: '10px',
    border: '1px solid #dfe1e5',
  },

  input: {
    width: '100%',
    background: 'transparent',
    border: 'none',
    margin: 0,
    padding: 0,
    color: 'rgba(0,0,0,.87)',
    outline: 'none',
    display: 'flex',
    fontSize: '16px',
  },

  buttonBox: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default function MyModal({
  openModal,
  titleText,
  placeholderText,
  buttonText,
  handleModalInputSubmit,
  handleModalClose,
}) {
  const classes = useStyles();
  const inputRef = useRef();
  const [inputText, setInputText] = useState('');

  return (
    <Modal
      className={classes.root}
      open={openModal}
      onClose={handleModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Paper className={classes.modal}>
        <Typography className={classes.titleText} variant="h3">
          {titleText}
        </Typography>
        {placeholderText && (
          <Box className={classes.inputBox}>
            <InputBase
              ref={inputRef}
              className={classes.input}
              value={inputText}
              name="modalInput"
              onChange={(e) => setInputText(e.target.value)}
              placeholder={placeholderText}
            />
          </Box>
        )}
        <Box className={classes.buttonBox}>
          <Button
            variant="contained"
            color="secondary"
            disabled={placeholderText && inputText.length === 0}
            onClick={() => handleModalInputSubmit(inputText)}
          >
            <Typography variant="body2">{buttonText}</Typography>
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}
