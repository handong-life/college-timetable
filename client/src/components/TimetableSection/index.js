import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box, IconButton, ButtonGroup, Tabs, Tab, Typography, Tooltip } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';

import LectureGrid from './LectureGrid';
import { sum } from '../../utils/helper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden',

    [theme.breakpoints.down('sm')]: {
      height: (props) => (props.hideSearchTab ? '100%' : '75%'),
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 'fit-content',
  },

  tabs: {
    height: '100%',
  },

  buttonGroup: {
    alignSelf: 'flex-end',
    height: 40,
    borderRadius: '23px',
    backgroundColor: 'white',
    marginBottom: '5px',
  },

  timetableHeader: {
    width: '100%',
    height: '50px',
    display: 'grid',
    gridTemplateRows: 'repeat(1, 1fr)',
    gridTemplateColumns: '0.5fr repeat(5, minmax(auto, 1fr))',
    borderTop: '1px solid #eaedf1',
    borderLeft: '1px solid #eaedf1',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
    backgroundColor: '#eaedf1',

    [theme.breakpoints.down('sm')]: {
      height: '40px',
    },
  },

  timetableBody: {
    width: '100%',
    display: 'grid',
    overflowY: 'scroll',
    gridTemplateRows: 'repeat(9, 80px)',
    gridTemplateColumns: '0.5fr repeat(5, minmax(0, 1fr))',
    borderTop: '1px solid #eaedf1',
    borderLeft: '1px solid #eaedf1',
    borderBottom: '1px solid #eaedf1',
    backgroundColor: 'white',

    [theme.breakpoints.down('sm')]: {
      gridTemplateRows: 'repeat(9, 60px)',
    },
  },

  dayIndicator: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  periodIndicator: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRight: '1px solid #eaedf1',
    borderBottom: '1px solid #eaedf1',
  },

  periodGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    padding: '1px',
    borderBottom: '1px solid #eaedf1',
    borderRight: '1px solid #eaedf1',
  },

  bottomBar: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 5,
    marginRight: 2,
    minHeight: 'fit-content',
  },

  hideButton: {
    marginLeft: 2,
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
}));

const getLecturesForTimetable = (lectures = []) => {
  const lecturesForTimetable = {};
  lectures.forEach((lecture) =>
    lecture.period.split(',').forEach((period) => (lecturesForTimetable[period] = lecture)),
  );
  return lecturesForTimetable;
};

export default function TimetableSection({
  timetables,
  lectures,
  selectedIndex,
  hideSearchTab,
  toggleHideSearchTab,
  handleLectureDeleteClick,
  handleSelectedTimetableIndexChange,
  handleTimetableCreate,
  handleTimetableDelete,
  handleTimetableEdit,
}) {
  const TIMETABLE_DAYS = ['', '월', '화', '수', '목', '금'];
  const MAX_PERIOD = 9;
  const classes = useStyles({ hideSearchTab });
  const lecturesForTimetable = getLecturesForTimetable(lectures);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const PeriodIndicator = (index) => {
    return (
      <Box className={classes.periodIndicator} key={index}>
        <Typography variant="body2">{parseInt(index / TIMETABLE_DAYS.length + 1)}</Typography>
      </Box>
    );
  };

  const DayIndicator = (indicator) => {
    return (
      <Box className={classes.dayIndicator} key={indicator}>
        <Typography variant="body2">{indicator}</Typography>
      </Box>
    );
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        {timetables.length === 0 ? (
          <div className={classes.tabs}></div>
        ) : (
          <Tabs
            className={classes.tabs}
            value={selectedIndex}
            onChange={handleSelectedTimetableIndexChange}
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {timetables.map((timetable) => (
              <Tab
                label={<Typography variant="body2">{timetable.title}</Typography>}
                key={timetable.id}
              />
            ))}
          </Tabs>
        )}
        <ButtonGroup size="small" className={classes.buttonGroup}>
          <Tooltip title="시간표 생성" arrow>
            <IconButton onClick={handleTimetableCreate}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="시간표 이름 수정" arrow>
            <IconButton onClick={handleTimetableEdit}>
              <CreateIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="시간표 삭제" arrow>
            <IconButton onClick={handleTimetableDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </Box>

      <Box className={classes.timetableHeader}>
        {TIMETABLE_DAYS.map((indicator) => DayIndicator(indicator))}
      </Box>
      <Box className={classes.timetableBody}>
        {Array.from(Array(TIMETABLE_DAYS.length * MAX_PERIOD)).map((value, index) => {
          if (index % TIMETABLE_DAYS.length === 0) return PeriodIndicator(index);
          const period =
            TIMETABLE_DAYS[index % TIMETABLE_DAYS.length] +
            parseInt(index / TIMETABLE_DAYS.length + 1);

          return (
            <Box
              className={classes.periodGrid}
              key={index}
              onMouseOver={() => setHoveredIndex(lecturesForTimetable[period]?.id || -1)}
            >
              <LectureGrid
                lecture={lecturesForTimetable[period]}
                handleDeleteClick={handleLectureDeleteClick}
                key={index}
                isHovered={hoveredIndex === lecturesForTimetable[period]?.id}
              />
            </Box>
          );
        })}
      </Box>

      <Box className={classes.bottomBar}>
        <AspectRatioIcon
          className={classes.hideButton}
          onClick={toggleHideSearchTab}
          style={{ color: 'rgba(0, 0, 0, 0.54)' }}
        />
        <Typography variant="body1">{sum(lectures, 'credit')}학점</Typography>
      </Box>
    </Box>
  );
}
