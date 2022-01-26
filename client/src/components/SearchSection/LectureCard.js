import React from 'react';
import { Switch, Case, Default } from 'react-if';
import { Box, IconButton, Tooltip, Typography, makeStyles, Button } from '@material-ui/core';

import BookmarkIcon from '@material-ui/icons/Bookmark';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import EcoOutlinedIcon from '@material-ui/icons/EcoOutlined';
import EcoIcon from '@material-ui/icons/Eco';
import { SEARCH_TABS } from '../../commons/constants';

const useStyles = makeStyles((theme) => ({
  root: {
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
    textAlign: 'left',
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

  buttonItem: {
    lineHeight: '100%',
  },

  buttonEndIcon: {
    marginRight: '0',
  },

  countText: {
    lineHeight: '100%',
  },
}));

export default function LectureCard({
  searchTab,
  lecture,
  onAddClick,
  onDeleteClick,
  onBookmarkClick,
  onUnbookmarkClick,
  onAddSpikeClick,
  onDeleteSpikeClick,
}) {
  const classes = useStyles();

  const DeleteButtonGroup = (onClick, title) => {
    return (
      <Box className={classes.buttonGroup}>
        <IconButton onClick={onClick}>
          <Tooltip title={title} arrow>
            <DeleteIcon />
          </Tooltip>
        </IconButton>
      </Box>
    );
  };

  const DefaultButtonGroup = () => {
    return (
      <Box className={classes.buttonGroup}>
        <Tooltip title="현재 시간표에 추가" arrow>
          <Button
            className={classes.buttonItem}
            classes={{ startIcon: classes.buttonEndIcon }}
            onClick={onAddClick}
            startIcon={<AddIcon />}
          >
            {/* <Typography className={classes.countText}>10</Typography> */}
            <Box className={classes.countText}>
              <Typography>{lecture.count?.add || ''}</Typography>
            </Box>
          </Button>
        </Tooltip>
        <Tooltip title={lecture.isBookmarked ? '즐겨찾기 삭제' : '즐겨찾기 추가'} arrow>
          <Button
            className={classes.buttonItem}
            classes={{ startIcon: classes.buttonEndIcon }}
            onClick={lecture.isBookmarked ? onUnbookmarkClick : onBookmarkClick}
            startIcon={lecture.isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          >
            {/* <Typography className={classes.countText}>10</Typography> */}
            <Box className={classes.countText}>
              <Typography>{lecture.count?.bookmark || ''}</Typography>
            </Box>
          </Button>
        </Tooltip>
        <Tooltip title={lecture.isSpike ? '이삭 줍기에서 삭제' : '이삭 줍기에서 추가'} arrow>
          <Button
            className={classes.buttonItem}
            classes={{ startIcon: classes.buttonEndIcon }}
            onClick={lecture.isSpike ? onDeleteSpikeClick : onAddSpikeClick}
            startIcon={lecture.isSpike ? <EcoIcon /> : <EcoOutlinedIcon />}
          >
            {/* <Typography className={classes.countText}>10</Typography> */}
            <Box className={classes.countText}>
              <Typography>{lecture.count?.spike || ''}</Typography>
            </Box>
          </Button>
        </Tooltip>
      </Box>
    );
  };

  return (
    <Box className={classes.root} id={lecture.id}>
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
          <Typography className={classes.item}>영어 {lecture.english}</Typography>
          <Typography className={classes.item}>{lecture.grading}</Typography>
          <Typography className={classes.item}>{lecture.roomNo}</Typography>
        </Box>
        <Box className={classes.row}>
          {lecture.period.split(',').map((period, index) => (
            <Box key={index} className={classes.period}>
              <Typography>{period}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      {
        <Switch>
          <Case condition={searchTab === SEARCH_TABS.TIMETABLE}>
            {DeleteButtonGroup(onDeleteClick, '현재 시간표에서 삭제')}
          </Case>
          <Case condition={searchTab === SEARCH_TABS.SPIKES}>
            {DeleteButtonGroup(onDeleteSpikeClick, '이삭 줍기에서 삭제')}
          </Case>
          <Default>{DefaultButtonGroup()}</Default>
        </Switch>
      }
    </Box>
  );
}
