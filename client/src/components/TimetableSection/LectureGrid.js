import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';

const colorSet = ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"];

const useStyles = makeStyles((theme) => {
  return {
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
      backgroundColor: (props) => (props.bgColor),
      boxShadow: (props) => (props.isConnected ? '0px -3px 0px ' + props.bgColor : 'none'),
    },

    item: {
      height: '20px',
      overflow: 'hidden',
      textAlign: 'center',
      textOverflow: 'ellipsis',
      opacity: (props) => (props.isHovered ? 0.3 : 1),
      display: (props) => (props.isConnected ? 'none' : 'block'),
    },

    hoverLayer: {
      opacity: (props) => (props.isHovered ? 1 : 0),
    },
  };
});

export default function LectureGrid({ lecture, handleDeleteClick, colorIndex, isHovered, isConnected }) {
  const bgColor = colorSet[colorIndex % colorSet.length];
  const classes = useStyles({ isHovered, isConnected, bgColor });

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
      <Typography className={classes.item}>{lecture.roomNo}</Typography>
      {/* <Box className={classes.hoverLayer}>
        <DeleteIcon style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
      </Box> */}
    </Box>
  ) : (
    <></>
  );
}
