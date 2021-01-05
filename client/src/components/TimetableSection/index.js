import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import LectureGrid from './LectureGrid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    overflowY: 'hidden',
    borderBottom: '1px solid #eaedf1',
  },

  header: {
    width: '100%',
    height: '50px',
    display: 'grid',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
    gridTemplateRows: 'repeat(1, 1fr)',
    gridTemplateColumns: '0.5fr repeat(6, minmax(auto, 1fr))',
    borderTop: '1px solid #eaedf1',
    borderLeft: '1px solid #eaedf1',
    backgroundColor: '#eaedf1',
  },

  timetableBody: {
    width: '100%',
    height: '100%',
    display: 'grid',
    overflowY: 'scroll',
    gridTemplateColumns: '0.5fr repeat(6, minmax(auto, 1fr))',
    borderTop: '1px solid #eaedf1',
    borderLeft: '1px solid #eaedf1',
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
    width: '100%',
    height: '80px',
    padding: '1px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderBottom: '1px solid #eaedf1',
    borderRight: '1px solid #eaedf1',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const getLecturesForTT = (lectures = []) => {
  const lecturesForTT = {};
  lectures.forEach((lecture) =>
    lecture.period.split(',').forEach((period) => (lecturesForTT[period] = lecture)),
  );
  return lecturesForTT;
};

export default function TimetableSection({
  timetables,
  lectures,
  selectedIndex,
  handleTimetableChange,
}) {
  const TIMETABLE_DAYS = ['', '월', '화', '수', '목', '금', '토'];
  const classes = useStyles();
  const lecturesForTT = getLecturesForTT(lectures);

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
    <div className={classes.root}>
      <Tabs
        value={selectedIndex}
        onChange={handleTimetableChange}
        indicatorColor="primary"
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
      <Box className={classes.header}>
        {TIMETABLE_DAYS.map((indicator) => DayIndicator(indicator))}
      </Box>
      <Box className={classes.timetableBody}>
        {Array.from(Array(63)).map((value, index) => {
          if (index % 7 === 0) return PeriodIndicator(index);
          const period = TIMETABLE_DAYS[index % 7] + parseInt(index / 7 + 1);

          return (
            <Box className={classes.periodGrid} key={index}>
              <LectureGrid lecture={lecturesForTT[period]} key={index} />
            </Box>
          );
        })}
      </Box>
    </div>
  );
}
