import React, { useState } from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

import Tabs from '../Tabs';
import TimetableButtonGroup from './TimetableButtonGroup';
import LectureGrid from './LectureGrid';
import { sum } from '../../utils/helper';
import { TIMETABLE_DAYS, MAX_PERIOD, TIMETABLE_COLORSET } from '../../commons/constants';

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
    padding: '0px',
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
    color: 'rgba(0, 0, 0, 0.54)',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },

  creditSum: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '5px',
  },
}));

const getLecturesForTimetable = (lectures = []) => {
  const lecturesForTimetable = {};
  lectures.forEach((lecture) =>
    lecture.period.split(',').forEach((period) => (lecturesForTimetable[period] = lecture)),
  );
  return lecturesForTimetable;
};

const getPeriod = (index) =>
  TIMETABLE_DAYS[index % TIMETABLE_DAYS.length] + parseInt(index / TIMETABLE_DAYS.length + 1);

export default function TimetableSection({
  timetables,
  lectures,
  tabIndex,
  setTabIndex,
  hideSearchTab,
  setHideSearchTab,
  handleDeleteLectureClick,
  handleCreateTimetableClick,
  handleDeleteTimetableClick,
  handleEditTimetableClick,
  handleShareTimetableClick,
  isSharePage,
}) {
  const classes = useStyles({ hideSearchTab });

  const lecturesForTimetable = getLecturesForTimetable(lectures);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const colorIndexByLectureId = {};
  let colorIndex = 0;

  const PeriodIndicator = ({ index }) => {
    return (
      <Box className={classes.periodIndicator}>
        <Typography variant="body2">{parseInt(index / TIMETABLE_DAYS.length + 1)}</Typography>
      </Box>
    );
  };

  const DayIndicator = ({ indicator }) => {
    return (
      <Box className={classes.dayIndicator}>
        <Typography variant="body2">{indicator}</Typography>
      </Box>
    );
  };

  const CreditIndicator = () => (
    <Box className={classes.creditSum}>
      <Typography variant="body1">총 {sum(lectures, 'credit')}학점</Typography>
    </Box>
  );

  const getIsConnected = (index, lectureId) =>
    index > TIMETABLE_DAYS.length &&
    lecturesForTimetable[getPeriod(index - TIMETABLE_DAYS.length)]?.id === lectureId;

  const getBgColor = (lectureId) => {
    if (!(lectureId in colorIndexByLectureId))
      colorIndexByLectureId[lectureId] = colorIndex++;
    return TIMETABLE_COLORSET[colorIndexByLectureId[lectureId] % TIMETABLE_COLORSET.length];
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        {timetables.length === 0 ? (
          <div className={classes.tabs}></div>
        ) : (
          <Tabs
            value={tabIndex}
            onChange={(e, index) => setTabIndex(index)}
            tabs={timetables.map(({ title }) => title)}
          />
        )}
        {!isSharePage ? (
          <TimetableButtonGroup
            {...{
              handleCreateTimetableClick,
              handleDeleteTimetableClick,
              handleEditTimetableClick,
              handleShareTimetableClick,
            }}
          />
        ) : (
          <CreditIndicator />
        )}
      </Box>

      <Box className={classes.timetableHeader}>
        {TIMETABLE_DAYS.map((indicator, index) => (
          <DayIndicator indicator={indicator} key={index} />
        ))}
      </Box>
      <Box className={classes.timetableBody}>
        {Array.from(Array(TIMETABLE_DAYS.length * MAX_PERIOD)).map((value, index) => {
          if (index % TIMETABLE_DAYS.length === 0)
            return <PeriodIndicator index={index} key={index} />;

          const period = getPeriod(index);
          const isConnected = getIsConnected(index, lecturesForTimetable[period]?.id);
          const bgColor = getBgColor(lecturesForTimetable[period]?.id);

          return (
            <Box
              className={classes.periodGrid}
              key={index}
              onMouseOver={() => setHoveredIndex(lecturesForTimetable[period]?.id || -1)}
            >
              <LectureGrid
                lecture={lecturesForTimetable[period]}
                handleDeleteClick={isSharePage ? undefined : handleDeleteLectureClick}
                key={index}
                bgColor={bgColor}
                isHovered={hoveredIndex === lecturesForTimetable[period]?.id}
                isConnected={isConnected}
              />
            </Box>
          );
        })}
      </Box>
      {!isSharePage && (
        <Box className={classes.bottomBar}>
          <Box className={classes.hideButton} onClick={() => setHideSearchTab((v) => !v)}>
            {hideSearchTab ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </Box>

          <CreditIndicator />
        </Box>
      )}
    </Box>
  );
}
