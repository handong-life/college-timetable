import React, { useEffect, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';

import { Timetable } from '../models';
import { Header, TimetableSection } from '../components';
import { NotFoundPage } from '.';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  body: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '50%',
    height: '100%',
    padding: '20px',
    overflow: 'hidden',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      width: '100%',
      padding: '10px',
    },
  },
}));

export default function SharePage({ match }) {
  const classes = useStyles();

  const [timetable, setTimetable] = useState({});
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    Timetable.getBySharedId(match.params.id).then(
      (res) => setTimetable(new Timetable(res.data)),
      (err) => setNotFound(true),
    );
  }, [match.params.id]);

  return notFound ? (
    <NotFoundPage />
  ) : (
    <Box className={classes.root}>
      <Header collegeName="한동대" isSharePage />
      <Box className={classes.body}>
        <TimetableSection
          selectedIndex={0}
          timetables={[timetable]}
          lectures={timetable.lectures ?? []}
          isSharePage
        />
      </Box>
    </Box>
  );
}
