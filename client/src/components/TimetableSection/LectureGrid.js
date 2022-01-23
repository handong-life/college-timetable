import React, { useState } from 'react';
import { Box, Typography, Tooltip, makeStyles, withStyles } from '@material-ui/core';

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

const LectureInfoTooltip = withStyles((theme) => {
  return {
    arrow: {
      "&:before": {
        border: '1px solid #eaedf1',
      },
      color: 'white',
    },
    tooltip: {
      backgroundColor: 'white',
      border: '1px solid #eaedf1',
      color: theme.palette.text.primary,
    }
  };
})(Tooltip);

export default function LectureGrid({ lecture, handleDeleteClick, bgColor, isHovered, isConnected }) {
  const [isHover, setIsHover] = useState(false);
  const classes = useStyles({ bgColor, isHovered, isConnected });

  return lecture ? (
    <LectureInfoTooltip
      title={
        <React.Fragment>
          <Typography>학점: {lecture.credit}</Typography>
          <Typography>영어비율: {lecture.english}</Typography>
          <Typography>성적유형: {lecture.grading}</Typography>
          <Typography>PF 변경: {lecture.pfPossible ? "가능" : "불가능"}</Typography>
        </React.Fragment>
      }
      arrow
      placement="bottom"
      open={!isConnected && isHover}
    >
      <Box
        className={classes.root}
        id={lecture.id}
        key={lecture.id}
        onClick={() => handleDeleteClick(lecture)}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
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
    </LectureInfoTooltip>
  ) : (
    <></>
  );
}
