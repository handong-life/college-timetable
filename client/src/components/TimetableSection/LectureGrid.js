import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

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
    cursor: 'pointer',

    '&:hover': {
      '& > $item': {
        opacity: 0.3,
      },

      '& > $hoverLayer': {
        opacity: 1,
      },
    },
  },

  item: {
    height: '20px',
    overflow: 'hidden',
    textAlign: 'center',
    textOverflow: 'ellipsis',
  },

  hoverLayer: {
    opacity: 0,
    position: 'absolute',
  },
}));

export default function LectureGrid({ lecture, handleDeleteClick }) {
  const classes = useStyles();
  return lecture ? (
    <Box
      className={classes.root}
      id={lecture.id}
      key={lecture.id}
      onClick={() => handleDeleteClick(lecture)}
    >
      <Typography className={classes.item} variant="body2">
        {lecture.name}
      </Typography>
      <Typography className={classes.item}>{lecture.professor}</Typography>
      <Typography className={classes.item}>{lecture.period}</Typography>
      <Box className={classes.hoverLayer}>
        <DeleteIcon style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
      </Box>
    </Box>
  ) : (
    <></>
  );
}
