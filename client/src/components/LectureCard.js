import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import AddIcon from '@material-ui/icons/Add';
// import DeleteIcon from '@material-ui/icons/Delete';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

const useStyles = makeStyles((theme) => ({
  lectureCard: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '15px',
    border: '1px solid #dfe1e5',
    marginBottom: '10px',

    '&:hover': {
      borderColor: 'rgba(223,225,229,0)',
      boxShadow: '0 1px 6px rgba(32,33,36,.28)',
      '& $buttonGroup': {
        display: 'flex',
      },
    },
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    marginBottom: '5px',
  },

  title: {
    marginRight: '5px',
  },

  item: {
    marginRight: '5px',
  },

  period: {
    height: '21px',
    lineHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    borderRadius: '10px',
    marginRight: '5px',
    padding: '3px 7px 3px 7px',
  },

  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginLeft: 'auto',
    paddingRight: '10px',
  },
}));

export default function LectureCard({ lecture, onAddClick, onBookmarkClick, onUnbookmarkClick }) {
  const classes = useStyles();
  return (
    <Box className={classes.lectureCard} id={lecture.id}>
      <Box className={classes.column}>
        <Box className={classes.row}>
          <Typography className={classes.item} variant="h3">
            {lecture.name}
          </Typography>
          <Typography className={classes.item}>
            {lecture.professor}/{lecture.credit}학점
          </Typography>
        </Box>
        <Box className={classes.row}>
          <Typography className={classes.item}>{lecture.hakbu}</Typography>
          <Typography className={classes.item}>{lecture.gubun}</Typography>
          <Typography className={classes.item}>{lecture.gyoyang}</Typography>
        </Box>
        <Box className={classes.row}>
          {lecture.period.split(',').map((period, index) => (
            <Box key={index} className={classes.period}>
              <Typography>{period}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box className={classes.buttonGroup}>
        <IconButton onClick={onAddClick}>
          <AddIcon />
        </IconButton>
        <IconButton onClick={lecture.isBookmarked ? onUnbookmarkClick : onBookmarkClick}>
          {lecture.isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </Box>
    </Box>
  );
}
