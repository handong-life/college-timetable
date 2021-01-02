import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

const useTopBarStyle = makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 60,
    paddingLeft: 30,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',

    [theme.breakpoints.down('sm')]: {
      height: 60,
      paddingLeft: 20,
    },
  },
  icon: {
    marginRight: 30,

    [theme.breakpoints.down('sm')]: {
      marginRight: 20,
    },
  },
}));

export default function TopBar() {
  const classes = useTopBarStyle();
  return (
    <AppBar className={classes.appBar} position={'relative'} color={'default'}>
      <Typography variant={'h1'} className={classes.icon}>
        🗓
      </Typography>
      <Typography variant={'h1'}>대학시간</Typography>
    </AppBar>
  );
}
