import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { AppBar, Box, IconButton, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useTopBarStyle = makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 60,
    padding: '0 10px 0 30px ',
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 2px 0px',

    [theme.breakpoints.down('sm')]: {
      height: 60,
      padding: '0 10px 0 20px ',
    },
  },

  front: {
    display: 'flex',
    marginRight: 'auto',
  },

  title: {
    fontWeight: 800,
    fontSize: '20px',
  },

  icon: {
    marginRight: 8,
    width: '30px',
  },
}));

export default function Header({ logout }) {
  const classes = useTopBarStyle();

  return (
    <AppBar className={classes.appBar} position={'relative'} color={'default'}>
      <Box className={classes.front}>
        <img className={classes.icon} src="/timetable.png" />
        <Typography className={classes.title}>대학시간</Typography>
      </Box>
      <IconButton onClick={logout}>
        <ExitToAppIcon />
      </IconButton>
    </AppBar>
  );
}
