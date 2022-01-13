import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  zoomkoding: {
    fontWeight: 700,
    color: '#02ccf2',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      Copyright ⓒ 2022.&nbsp;
      <a className={classes.zoomkoding} href="https://www.zoomkoding.com">
        zoomkoding
      </a>
      .&nbsp;All Rights Reserved.
    </div>
  );
}
