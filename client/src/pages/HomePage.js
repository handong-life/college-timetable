import React from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  body: {
    display: 'flex',
    flexDirection: 'column',
  },

  header: {
    display: 'flex',
    height: 50,
    width: '100%',
    marginBottom: 5,
  },

  title: {
    fontWeight: 800,
    fontSize: 40,
    marginRight: 'auto',
  },

  icon: {
    width: 50,
    marginLeft: 'auto',
    marginRight: 8,
  },

  subtitle: {
    fontWeight: 600,
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 30,
  },

  loginButton: {
    fontWeight: 600,
    fontSize: 15,
    color: '#000000',
  },

  google: {
    width: 15,
    height: 15,
    marginRight: 10,
    marginBottom: 2,
  },
}));

export default function HomePage({ authenticated, location }) {
  const classes = useStyles();
  if (authenticated) return <Redirect to="/handong" />;
  return (
    <div className={classes.root}>
      <div className={classes.body}>
        <div className={classes.header} position={'relative'} color={'default'}>
          <img className={classes.icon} src="/timetable.png" />
          <Typography className={classes.title}>대학시간</Typography>
        </div>
        <Typography className={classes.subtitle}>대학교 예비 수강신청 도우미</Typography>

        <Button
          className={classes.loginButton}
          variant="text"
          href="http://www.timetable.college/api/auth/google"
        >
          <img className={classes.google} src="/google.png" />
          학교 계정으로 시작하기
        </Button>
      </div>
    </div>
  );
}
