import React, { useEffect, useState } from 'react';
import { Axios } from '../lib/axios';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

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
  const [timetable, setTimetable] = useState({});
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    Axios()
      .get(`/share/${match.params.id}`)
      .then(
        (res) => setTimetable(res.data),
        () => setNotFound(true),
      );
  }, []);

  const classes = useStyles();
  return notFound ? (
    <NotFoundPage />
  ) : (
    <Box className={classes.root}>
      <Header {...{ collegeName: '한동대' }} />
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
