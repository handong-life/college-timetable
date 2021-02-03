import React, { useState, useEffect, useRef } from 'react';
import { Modal, Paper, Box, Typography, InputBase, Button, makeStyles } from '@material-ui/core';

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
      width: 350,
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

export default function MyModal({ open, isInputRequired, onSubmit, text, onClose }) {
  const classes = useStyles();

  const inputRef = useRef();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue('');
  }, [open]);

  return (
    <Modal className={classes.root} open={open} onClose={onClose}>
      <Paper className={classes.modal}>
        <Typography className={classes.titleText} variant="h3">
          {text.title}
        </Typography>
        {isInputRequired && (
          <form
            className={classes.inputBox}
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(inputValue);
            }}
          >
            <InputBase
              ref={inputRef}
              autoFocus
              className={classes.input}
              value={inputValue}
              autoComplete="off"
              name="modalInput"
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={text.placeholder}
            />
          </form>
        )}
        <Box className={classes.buttonBox}>
          <Button
            variant="contained"
            color="secondary"
            disabled={isInputRequired && inputValue.length === 0}
            onClick={() => onSubmit(inputValue)}
          >
            <Typography variant="body2">{text.button}</Typography>
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}
