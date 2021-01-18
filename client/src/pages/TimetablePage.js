import React, { useState, useEffect } from 'react';

import { Axios } from '../lib/axios';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import { Lecture, Timetable, User } from '../models';
import { Header, Modal, SearchSection, TimetableSection } from '../components';

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

export default function TimetablePage({ collegeName, logout }) {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [user, setUser] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [{ selectedTimetableIndex, timetables }, setTimetableTab] = useState({
    selectedTimetableIndex: -1,
    timetables: [],
  });
  const [timetableLectures, setTimetableLectures] = useState([]);
  const [selectedSearchTabIndex, setSelectedSearchTabIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalInfo, setModalInfo] = useState({ openModal: false });
  const [hideSearchTab, setHideSearchTab] = useState(false);

  useEffect(() => {
    Axios()
      .get(`/user`)
      .then(({ data }) => {
        setUser(new User(data));
        setBookmarks(
          data.lectures.map((lecture) => ({ ...new Lecture(lecture), isBookmarked: true })),
        );
        setTimetableTab({
          selectedTimetableIndex: data.timetables.length === 0 ? -1 : 0,
          timetables: data.timetables,
        });
        setTimetableLectures(
          data.timetables[0]
            ? data.timetables[0].lectures.map((lecture) => ({
                ...new Lecture(lecture),
                isAdded: true,
              }))
            : [],
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
    if (user) getTimetable();
  }, [selectedTimetableIndex]);

  const getSearchResults = () => {
    setSearchLoading(true);

    Axios()
      .get(`/search?search=${search}`)
      .then((res) => {
        setSearchResults(
          res.data.map((lecture) => ({
            ...new Lecture(lecture),
            isBookmarked: bookmarks.find((bookmark) => bookmark.id === lecture.id),
          })),
        );
        setSearchLoading(false);
      });
  };

  const getTimetable = () => {
    if (selectedTimetableIndex === -1) {
      return setTimetableLectures([]);
    }
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
    if (selectedTimetableIndex === -1) {
      return setErrorMessage('현재 시간표가 없습니다!');
    }

    const isLectureDup = timetableLectures.findIndex(({ id }) => id === lecture.id) !== -1;

    if (isLectureDup) {
      return setErrorMessage('이미 시간표에 추가된 과목입니다!');
    }

    const isNameDup = timetableLectures.findIndex(({ name }) => name === lecture.name) !== -1;

    if (isNameDup) {
      return setErrorMessage('분반이 다른 같은 과목이 존재합니다!');
    }

    const isPeriodDup = timetableLectures.reduce(
      (isDup, { period: periods }) =>
        isDup ||
        lecture.period
          .split(',')
          .reduce((isDup, period) => isDup || periods.includes(period), false),
      false,
    );

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
        handleModalClose();
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

  const openFeedbackReportModal = () => {
    setModalInfo({
      openModal: true,
      handleModalInputSubmit: handleFeedbackReport,
      handleModalClose,
      titleText: '버그나 피드백을 남겨주세요!',
      placeholderText: '버그, 피드백',
      buttonText: '제출',
    });
  };

  const openTimetableEditModal = () => {
    if (selectedTimetableIndex === -1) {
      return setErrorMessage('수정할 시간표가 없습니다!');
    }
    setModalInfo({
      openModal: true,
      handleModalInputSubmit: handleTimetableEdit,
      handleModalClose,
      titleText: '시간표 이름 변경',
      placeholderText: '시간표 이름',
      buttonText: '변경',
    });
  };

  const openLectureDeleteModal = (lecture) => {
    setModalInfo({
      openModal: true,
      handleModalInputSubmit: () => handleDeleteClick(lecture),
      handleModalClose,
      titleText: `'${lecture.name}'을(를) 삭제하시겠습니까?`,
      buttonText: '확인',
    });
  };

  const openTimetableDeleteModal = () => {
    if (selectedTimetableIndex === -1) {
      return setErrorMessage('삭제할 시간표가 없습니다!');
    }
    setModalInfo({
      openModal: true,
      handleModalInputSubmit: handleTimetableDelete,
      handleModalClose,
      titleText: `'${timetables[selectedTimetableIndex].title}'을(를) 삭제하시겠습니까?`,
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
              selectedTimetableIndex === timetables.length - 1
                ? selectedTimetableIndex - 1
                : selectedTimetableIndex,
            timetables: [...timetables.filter((timetable) => timetable.id !== toDeleteId)],
          };
        });

        handleModalClose();
      });
  };

  const handleFeedbackReport = (feedback) => {
    Axios()
      .post(`/user/feedback`, { feedback })
      .then(() => handleModalClose());
  };

  const toggleHideSearchTab = () => setHideSearchTab(!hideSearchTab);

  return (
    <div className={classes.root}>
      <Header {...{ collegeName, logout, openFeedbackReportModal }} />
      <div className={classes.body}>
        {!hideSearchTab && (
          <SearchSection
            {...{
              lectures: [searchResults, bookmarks, timetableLectures],
              searchLoading,
              selectedSearchTabIndex,
              handleSelectedSearchTabIndex,
              handleSearchSubmit,
              handleClearClick,
              handleAddClick,
              handleDeleteClick: openLectureDeleteModal,
              handleBookmarkClick,
              handleUnbookmarkClick,
            }}
          />
        )}
        <TimetableSection
          {...{
            timetables,
            selectedIndex: selectedTimetableIndex,
            lectures: timetableLectures,
            hideSearchTab,
            toggleHideSearchTab,
            handleSelectedTimetableIndexChange,
            handleLectureDeleteClick: openLectureDeleteModal,
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
