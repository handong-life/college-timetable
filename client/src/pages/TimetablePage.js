import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { Axios } from '../lib/axios';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { Lecture, Timetable, User } from '../models';
import { TopBar, Modal, SearchSection, TimetableSection } from '../components';

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

export default function TimetablePage({ authenticated, logout }) {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [user, setUser] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [{ selectedTimetableIndex, timetables }, setTimetableTab] = useState({
    selectedTimetableIndex: 0,
    timetables: [],
  });
  const [timetableLectures, setTimetableLectures] = useState([]);
  const [selectedSearchTabIndex, setSelectedSearchTabIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalInfo, setModalInfo] = useState({ openModal: false });

  useEffect(() => {
    Axios()
      .get(`/user`)
      .then(({ data }) => {
        setUser(new User(data));
        setBookmarks(
          data.lectures.map((lecture) => ({ ...new Lecture(lecture), isBookmarked: true })),
        );
        setTimetableTab((timetableTab) => ({ ...timetableTab, timetables: data.timetables }));
        setTimetableLectures(
          data.timetables[0].lectures.map((lecture) => ({
            ...new Lecture(lecture),
            isAdded: true,
          })),
        );
      });
  }, []);

  useEffect(() => {
    if (search.length !== 0) getSearchResults();
  }, [search]);

  useEffect(() => {
    setSearchResults((lectures) =>
      lectures.map((lecture) => ({
        ...lecture,
        isBookmarked: bookmarks.find((bookmark) => bookmark.id === lecture.id) !== undefined,
      })),
    );
  }, [bookmarks]);

  useEffect(() => {
    if (user) {
      if (selectedTimetableIndex === -1) {
        handleTimetableCreate('예비시간표1');
      } else {
        getTimetable();
      }
    }
  }, [selectedTimetableIndex]);

  const getSearchResults = () => {
    Axios()
      .get(`/search?search=${search}`)
      .then((res) =>
        setSearchResults(
          res.data.map((lecture) => ({
            ...new Lecture(lecture),
            isBookmarked: bookmarks.find((bookmark) => bookmark.id === lecture.id),
          })),
        ),
      );
  };

  const getTimetable = () => {
    Axios()
      .get(`/timetable/${timetables[selectedTimetableIndex].id}`)
      .then(({ data: timetable }) => {
        setTimetableLectures(
          timetable.lectures.map((lecture) => ({
            ...new Lecture(lecture),
            isAdded: true,
          })),
        );
      });
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setErrorMessage('');
  };

  const handleSelectedTimetableIndexChange = (event, index) => {
    setTimetableTab((timetableTab) => ({ ...timetableTab, selectedTimetableIndex: index }));
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
    Axios()
      .post(`/user/bookmark/${lecture.id}`)
      .then((res) => {
        setBookmarks([...bookmarks, { ...lecture, isBookmarked: true }]);
      });
  };

  const handleUnbookmarkClick = (lecture) => {
    Axios()
      .delete(`/user/bookmark/${lecture.id}`)
      .then((res) => {
        setBookmarks([...bookmarks.filter((bookmark) => bookmark.id !== lecture.id)]);
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

    Axios()
      .post(`/timetable/lecture/${timetables[selectedTimetableIndex].id}/${lecture.id}`)
      .then((res) => {
        setTimetableLectures((lectures) => [...lectures, { ...lecture, isAdded: true }]);
      });
  };

  const handleDeleteClick = (lecture) => {
    Axios()
      .delete(`/timetable/lecture/${timetables[selectedTimetableIndex].id}/${lecture.id}`)
      .then((res) => {
        setTimetableLectures([
          ...timetableLectures.filter((timetableLecture) => timetableLecture.id !== lecture.id),
        ]);
      });
  };

  const handleModalClose = () => {
    setModalInfo({ openModal: false });
  };

  const openTimetableCreateModal = () => {
    setModalInfo({
      openModal: true,
      handleModalInputSubmit: handleTimetableCreate,
      handleModalClose,
      titleText: '시간표 생성',
      placeholderText: '시간표 이름',
      buttonText: '생성',
    });
  };

  const openTimetableEditModal = () => {
    setModalInfo({
      openModal: true,
      handleModalInputSubmit: handleTimetableEdit,
      handleModalClose,
      titleText: '시간표 이름 변경',
      placeholderText: '시간표 이름',
      buttonText: '변경',
    });
  };

  const openTimetableDeleteModal = (title) => {
    setModalInfo({
      openModal: true,
      handleModalInputSubmit: handleTimetableDelete,
      handleModalClose,
      titleText: `'${title}'을(를) 삭제하시겠습니까?`,
      buttonText: '확인',
    });
  };

  const handleTimetableCreate = (title) => {
    Axios()
      .post(`/timetable`, { title })
      .then((res) => {
        setTimetableTab(({ timetables }) => ({
          selectedTimetableIndex: timetables.length,
          timetables: [...timetables, new Timetable(res.data)],
        }));
        handleModalClose();
      });
  };

  const handleTimetableEdit = (title) => {
    const id = timetables[selectedTimetableIndex].id;

    Axios()
      .put(`/timetable`, { id, title })
      .then((res) => {
        setTimetableTab(({ timetables, selectedTimetableIndex }) => {
          timetables[selectedTimetableIndex].title = title;
          return {
            selectedTimetableIndex,
            timetables,
          };
        });

        handleModalClose();
      });
  };

  const handleTimetableDelete = () => {
    const toDeleteId = timetables[selectedTimetableIndex].id;
    Axios()
      .delete(`/timetable/${toDeleteId}`)
      .then((res) => {
        setTimetableTab(({ timetables, selectedTimetableIndex }) => {
          return {
            selectedTimetableIndex:
              selectedTimetableIndex == timetables.length - 1
                ? selectedTimetableIndex - 1
                : selectedTimetableIndex,
            timetables: [...timetables.filter((timetable) => timetable.id !== toDeleteId)],
          };
        });

        handleModalClose();
      });
  };

  if (!authenticated) return <Redirect to="/" />;

  return (
    <div className={classes.root}>
      <TopBar logout={logout} />
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
            handleSelectedTimetableIndexChange,
            handleTimetableCreate: openTimetableCreateModal,
            handleTimetableDelete: openTimetableDeleteModal,
            handleTimetableEdit: openTimetableEditModal,
          }}
        />
      </div>
      <Snackbar
        open={errorMessage.length !== 0}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
      >
        <Alert onClose={handleSnackBarClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Modal {...modalInfo} />
    </div>
  );
}
