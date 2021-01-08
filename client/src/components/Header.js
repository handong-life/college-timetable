import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { AppBar, Box, IconButton, Typography, Tooltip } from '@material-ui/core';
import FeedbackIcon from '@material-ui/icons/Feedback';
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

  icon: {
    marginRight: 8,
    width: 30,
    height: 30,
  },

  title: {
    fontWeight: 800,
    fontSize: '20px',
  },

  warning: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 15,
    fontWeight: 600,
    fontSize: 14,
    color: 'red',
  },
}));

export default function Header({ logout, openFeedbackReportModal }) {
  const classes = useTopBarStyle();

  return (
    <AppBar className={classes.appBar} position={'relative'} color={'default'}>
      <Box className={classes.front}>
        <img className={classes.icon} src="/timetable.png" />
        <Typography className={classes.title}>대학시간</Typography>
        <Typography className={classes.warning}>베타 테스트 중!</Typography>
      </Box>
      <Tooltip title="피드백 남기기" arrow>
        <IconButton onClick={openFeedbackReportModal}>
          <FeedbackIcon />
        </IconButton>
      </Tooltip>

      <IconButton onClick={logout}>
        <ExitToAppIcon />
      </IconButton>
    </AppBar>
  );
}
