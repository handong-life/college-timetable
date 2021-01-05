import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '1px',
    overflow: 'hidden',
  },
  item: {
    height: '20px',
    overflow: 'hidden',
    textAlign: 'center',
    textOverflow: 'ellipsis',
  },
}));

export default function LectureGrid({ lecture }) {
  const classes = useStyles();
  return lecture ? (
    <Box className={classes.root} id={lecture.id} key={lecture.id}>
      <Typography className={classes.item} variant="body2">
        {lecture.name}
      </Typography>
      <Typography className={classes.item}>{lecture.professor}</Typography>
      <Typography className={classes.item}>{lecture.period}</Typography>
    </Box>
  ) : (
    <></>
  );
}
