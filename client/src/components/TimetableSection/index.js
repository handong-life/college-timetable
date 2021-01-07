import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box, IconButton, ButtonGroup, Tabs, Tab, Typography, Tooltip } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import LectureGrid from './LectureGrid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden',
    borderBottom: '1px solid #eaedf1',
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
    gridTemplateColumns: '0.5fr repeat(6, minmax(auto, 1fr))',
    borderTop: '1px solid #eaedf1',
    borderLeft: '1px solid #eaedf1',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
    backgroundColor: '#eaedf1',
  },

  timetableBody: {
    width: '100%',
    height: '100%',
    display: 'grid',
    overflowY: 'scroll',
    gridTemplateRows: 'repeat(9, 80px)',
    gridTemplateColumns: '0.5fr repeat(6, minmax(0, 1fr))',
    borderTop: '1px solid #eaedf1',
    borderLeft: '1px solid #eaedf1',
    backgroundColor: 'white',
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
}));

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

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
  handleSelectedTimetableIndexChange,
  handleTimetableCreate,
  handleTimetableDelete,
  handleTimetableEdit,
}) {
  const TIMETABLE_DAYS = ['', '월', '화', '수', '목', '금', '토'];
  const classes = useStyles();
  const lecturesForTimetable = getLecturesForTimetable(lectures);

  const PeriodIndicator = (index) => {
    return (
      <Box className={classes.periodIndicator} key={index}>
        <Typography variant="body2">{parseInt(index / 7 + 1)}</Typography>
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
        <Tabs
          className={classes.tabs}
          value={selectedIndex}
          onChange={handleSelectedTimetableIndexChange}
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs"
        >
          {timetables.map((timetable, index) => (
            <Tab
              label={<Typography variant="body2">{timetable.title}</Typography>}
              key={timetable.id}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
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
            <IconButton onClick={() => handleTimetableDelete(timetables[selectedIndex].title)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </Box>

      <Box className={classes.timetableHeader}>
        {TIMETABLE_DAYS.map((indicator) => DayIndicator(indicator))}
      </Box>
      <Box className={classes.timetableBody}>
        {Array.from(Array(63)).map((value, index) => {
          if (index % 7 === 0) return PeriodIndicator(index);
          const period = TIMETABLE_DAYS[index % 7] + parseInt(index / 7 + 1);

          return (
            <Box className={classes.periodGrid} key={index}>
              <LectureGrid lecture={lecturesForTimetable[period]} key={index} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
