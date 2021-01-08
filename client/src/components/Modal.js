import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Paper, Box, Typography, InputBase, Button } from '@material-ui/core';

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

    [theme.breakpoints.down('sm')]: {
      width: 300,
    },
  },

  titleText: {
    margin: '0 0 10px 3px',
  },

  inputBox: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingLeft: '8px',
    marginBottom: '15px',
    borderRadius: '5px',
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

  useEffect(() => {
    setInputText('');
  }, [openModal]);

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
              autoComplete="off"
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
