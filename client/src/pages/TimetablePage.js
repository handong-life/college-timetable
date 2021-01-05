import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { Lecture } from '../models';
import { TopBar, SearchSection, TimetableSection } from '../components';
import { SERVERURL } from '../commons/constants';
import Timetable from '../models/Timetable';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    width: '100%',
    height: '100%',
    padding: '30px',
    overflow: 'hidden',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      padding: '10px',
    },
  },
}));

export default function TimetablePage() {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [timetables, setTimetables] = useState([]);
  const [timetableLectures, setTimetableLectures] = useState([]);
  const [selectedTimetableIndex, setSelectedTimetableIndex] = useState(0);
  const [selectedSearchTabIndex, setSelectedSearchTabIndex] = useState(0);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get(`${SERVERURL}/api/user`).then(({ data: user }) => {
      setBookmarks(
        user.lectures.map((lecture) => ({ ...new Lecture(lecture), isBookmarked: true })),
      );
      setTimetables(user.timetables.map((timetable) => new Timetable(timetable)));
      setTimetableLectures(
        user.timetables[0].lectures.map((lecture) => ({
          ...new Lecture(lecture),
          isAdded: true,
        })),
      );
    });
  }, []);

  useEffect(() => {
    if (search.length !== 0) {
      axios.get(`${SERVERURL}/api/search?search=${search}`).then((res) =>
        setSearchResults(
          res.data.map((lecture) => ({
            ...new Lecture(lecture),
            isBookmarked: bookmarks.find((bookmark) => bookmark.id === lecture.id),
          })),
        ),
      );
    }
  }, [search]);

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setErrorMessage('');
  };

  const handleTimeTableChange = (event, index) => {
    setSelectedTimetableIndex(index);
    axios.get(`${SERVERURL}/api/timetable/${timetables[index].id}`).then(({ data: timetable }) => {
      setSelectedTimetableIndex(index);
      setTimetableLectures(
        timetable.lectures.map((lecture) => ({
          ...new Lecture(lecture),
          isAdded: true,
        })),
      );
    });
  };

  const handleSelectedSearchTabIndex = (event, index) => {
    setSelectedSearchTabIndex(index);
  };

  const handleSearchSubmit = (search) => {
    setSelectedSearchTabIndex(0);
    setSearch(search);
  };

  const handleClearClick = () => {
    setSearch('');
    setSearchResults([]);
  };

  const handleBookmarkClick = (lecture) => {
    axios.post(`${SERVERURL}/api/user/bookmark/${lecture.id}`).then((res) => {
      setBookmarks([...bookmarks, lecture]);
      const id = searchResults.findIndex((result) => result.id === lecture.id);
      if (id === -1) return;
      const newSearchResults = [...searchResults];
      newSearchResults[id].isBookmarked = true;
      setSearchResults(newSearchResults);
    });
  };

  const handleUnbookmarkClick = (lecture) => {
    axios.delete(`${SERVERURL}/api/user/bookmark/${lecture.id}`).then((res) => {
      setBookmarks([...bookmarks.filter((bookmark) => bookmark.id !== lecture.id)]);
      const id = searchResults.findIndex((result) => result.id === lecture.id);
      if (id === -1) return;
      const newSearchResults = [...searchResults];
      newSearchResults[id].isBookmarked = false;
      setSearchResults(newSearchResults);
    });
  };

  const handleAddClick = (lecture) => {
    const isLectureDup =
      timetableLectures.findIndex((timetableLecture) => timetableLecture.id === lecture.id) !== -1;

    if (isLectureDup) {
      return setErrorMessage('이미 시간표에 추가된 과목입니다!');
    }

    const isPeriodDup =
      timetableLectures.findIndex((timetableLecture) =>
        timetableLecture.period.includes(lecture.period.split(',')),
      ) !== -1;

    if (isPeriodDup) {
      return setErrorMessage('해당 시간에 다른 과목이 존재합니다!');
    }

    axios
      .post(
        `${SERVERURL}/api/timetable/lecture/${timetables[selectedTimetableIndex].id}/${lecture.id}`,
      )
      .then((res) => {
        setTimetableLectures((lectures) => [...lectures, , { ...lecture, isAdded: true }]);
      });
  };

  const handleDeleteClick = (lecture) => {
    axios
      .delete(
        `${SERVERURL}/api/timetable/lecture/${timetables[selectedTimetableIndex].id}/${lecture.id}`,
      )
      .then((res) => {
        setTimetableLectures([
          ...timetableLectures.filter((timetableLecture) => timetableLecture.id !== lecture.id),
        ]);
      });
  };

  return (
    <div className={classes.root}>
      <TopBar />
      <div className={classes.body}>
        <SearchSection
          {...{
            selectedSearchTabIndex,
            handleSelectedSearchTabIndex,
            handleSearchSubmit,
            handleClearClick,
            handleAddClick,
            handleDeleteClick,
            handleBookmarkClick,
            handleUnbookmarkClick,
            lectures: [searchResults, bookmarks, timetableLectures],
          }}
        />
        <TimetableSection
          {...{
            timetables,
            selectedIndex: selectedTimetableIndex,
            lectures: timetableLectures,
            handleTimeTableChange,
          }}
        />
      </div>
      <Snackbar
        open={errorMessage.length !== 0}
        autoHideDuration={1000}
        onClose={handleSnackBarClose}
      >
        <Alert onClose={handleSnackBarClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
