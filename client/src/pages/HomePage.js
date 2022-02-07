import React, { useState, useEffect } from 'react';
import { Box, makeStyles } from '@material-ui/core';

import {
  USER_ACTIONS,
  SEARCH_ACTIONS,
  SNACKBAR_ACTIONS,
  MODAL_ACTIONS,
  NOTIFICATION_POSTED_AT,
} from '../commons/constants';

import {
  BookmarkedLecture,
  TimetableLecture,
  Lecture,
  Timetable,
  User,
  SpikeLecture,
} from '../models';
import {
  Header,
  Footer,
  Modal,
  SearchSection,
  Snackbar,
  TimetableSection,
  NewSemesterModal,
} from '../components';
import { useUser, useSearch, useSnackbar, useModal } from '../hooks';

import { copyToClipboard, isIn, isPeriodDup } from '../utils/helper';
import { getShareLink } from '../utils/share';
import useNotificationModal from '../hooks/useNotificationModal';

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

export default function HomePage({ logout }) {
  const classes = useStyles();

  const [{ timetables, bookmarks, spikes }, userDispatch] = useUser();
  const [searchState, searchDispatch] = useSearch(bookmarks, spikes);
  const [timetableLectures, setTimetableLectures] = useState([]);

  const [snackbarState, snackbarDispatch, closeSnackBar] = useSnackbar();
  const [modalState, modalDispatch, closeModal] = useModal();
  const [isNotiModalOpen, closeNotiModal] = useNotificationModal(NOTIFICATION_POSTED_AT);

  const [searchTabIndex, setSearchTabIndex] = useState(0);
  const [timetableTabIndex, setTimetableTabIndex] = useState(0);

  const [hideSearchTab, setHideSearchTab] = useState(false);

  useEffect(() => {
    setTimetableLectures(timetables[timetableTabIndex]?.lectures ?? []);
  }, [timetableTabIndex, timetables]);

  const getSearchResults = (search, page) => {
    searchDispatch({ type: SEARCH_ACTIONS.START_SEARCH });
    Lecture.getSearchResults(search, page).then(({ data: { lectures, pages } }) => {
      setSearchTabIndex(0);
      searchDispatch({
        type: SEARCH_ACTIONS.FINISH_SEARCH,
        payload: { search, lectures, page, pages, bookmarks, spikes },
      });
    });
  };

  const handleAddSpikeLectureClick = (lecture) => {
    if (spikes.length >= 4) return snackbarDispatch({ type: SNACKBAR_ACTIONS.ALERT_MAX_SPIKES });

    User.addSpikeLecture(lecture.id).then((res) => {
      userDispatch({
        type: USER_ACTIONS.ADD_SPIKE_LECTURE,
        payload: { lecture: new SpikeLecture(lecture).updateCount(res.data.count) },
      });
      searchDispatch({
        type: SEARCH_ACTIONS.REFLECT_COUNTS,
        payload: { lectureId: lecture.id, count: res.data.count },
      });
    });
  };

  const handleDeleteSpikeLectureClick = (lecture) => {
    User.deleteSpikeLecture(lecture.id).then((res) => {
      userDispatch({
        type: USER_ACTIONS.DELETE_SPIKE_LECTURE,
        payload: { lectureId: lecture.id },
      });
      searchDispatch({
        type: SEARCH_ACTIONS.REFLECT_COUNTS,
        payload: { lectureId: lecture.id, count: res.data.count },
      });
    });
  };

  const handleBookmarkLectureClick = (lecture) => {
    User.bookmarkLecture(lecture.id).then((res) => {
      userDispatch({
        type: USER_ACTIONS.BOOKMARK_LECTURE,
        payload: { lecture: new BookmarkedLecture(lecture).updateCount(res.data.count) },
      });
      searchDispatch({
        type: SEARCH_ACTIONS.REFLECT_COUNTS,
        payload: { lectureId: lecture.id, count: res.data.count },
      });
    });
  };

  const handleUnbookmarkLectureClick = (lecture) => {
    User.unbookmarkLecture(lecture.id).then((res) => {
      userDispatch({
        type: USER_ACTIONS.UNBOOKMARK_LECTURE,
        payload: { lectureId: lecture.id },
      });
      searchDispatch({
        type: SEARCH_ACTIONS.REFLECT_COUNTS,
        payload: { lectureId: lecture.id, count: res.data.count },
      });
    });
  };

  const handleAddLectureClick = (lecture) => {
    if (timetables.length === 0)
      return snackbarDispatch({ type: SNACKBAR_ACTIONS.ALERT_NO_CURRENT_TIMETABLE });

    if (isIn(lecture, timetableLectures, 'id'))
      return snackbarDispatch({ type: SNACKBAR_ACTIONS.ALERT_LECTURE_EXACT_DUP });

    if (isIn(lecture, timetableLectures, 'name'))
      return snackbarDispatch({ type: SNACKBAR_ACTIONS.ALERT_LECTURE_NAME_DUP });

    if (isPeriodDup(lecture, timetableLectures))
      return snackbarDispatch({ type: SNACKBAR_ACTIONS.ALERT_PERIOD_DUP });

    const timetableId = timetables[timetableTabIndex].id;

    Timetable.addLecture(timetableId, lecture.id).then((res) => {
      userDispatch({
        type: USER_ACTIONS.ADD_LECTURE_TO_TIMETABLE,
        payload: {
          timetableId,
          lecture: new TimetableLecture(lecture).updateCount(res.data.count),
        },
      });
      searchDispatch({
        type: SEARCH_ACTIONS.REFLECT_COUNTS,
        payload: { lectureId: lecture.id, count: res.data.count },
      });
    });
  };

  const handleDeleteLecture = (lectureId) => {
    const timetableId = timetables[timetableTabIndex].id;
    Timetable.deleteLecture(timetableId, lectureId).then((res) => {
      userDispatch({
        type: USER_ACTIONS.DELETE_LECTURE_FROM_TIMETABLE,
        payload: { timetableId, lectureId },
      });
      searchDispatch({
        type: SEARCH_ACTIONS.REFLECT_COUNTS,
        payload: { lectureId, count: res.data.count },
      });
      closeModal();
    });
  };

  const openCreateTimetableModal = () =>
    modalDispatch({
      type: MODAL_ACTIONS.OPEN_CREATE_TIMETABLE_MODAL,
      payload: { onSubmit: handleCreateTimetable },
    });

  const openReportFeedbackModal = () =>
    modalDispatch({
      type: MODAL_ACTIONS.OPEN_FEEDBACK_MODAL,
      payload: { onSubmit: handleFeedbackReport },
    });

  const openSubmitConfirmModal = () =>
    modalDispatch({
      type: MODAL_ACTIONS.OPEN_SUBMIT_CONFIRM_MODAL,
      payload: { onSubmit: handleSubmit },
    });

  const openEditTimetableModal = () => {
    if (timetables.length === 0)
      return snackbarDispatch({ type: SNACKBAR_ACTIONS.ALERT_NO_EDITABLE_TIMETABLE });

    modalDispatch({
      type: MODAL_ACTIONS.OPEN_EDIT_TIMETABLE_MODAL,
      payload: { onSubmit: handleEditTimetable },
    });
  };

  const openShareTimetableModal = () => {
    if (timetables.length === 0)
      return snackbarDispatch({ type: SNACKBAR_ACTIONS.ALERT_NO_SHAREABLE_TIMETABLE });

    modalDispatch({
      type: MODAL_ACTIONS.OPEN_SHARE_TIMETABLE_MODAL,
      payload: { onSubmit: handleShareTimetable },
    });
  };

  const openDeleteLectureModal = (lecture) => {
    modalDispatch({
      type: MODAL_ACTIONS.OPEN_DELETE_LECTURE_MODAL,
      payload: {
        onSubmit: () => handleDeleteLecture(lecture.id),
        lectureName: lecture.name,
      },
    });
  };

  const openDeleteTimetableModal = () => {
    if (timetables.length === 0)
      return snackbarDispatch({ type: SNACKBAR_ACTIONS.ALERT_NO_DELETABLE_TIMETABLE });

    modalDispatch({
      type: MODAL_ACTIONS.OPEN_DELETE_TIMETABLE_MODAL,
      payload: {
        onSubmit: handleDeleteTimetable,
        timetableTitle: timetables[timetableTabIndex].title,
      },
    });
  };

  const handleCreateTimetable = (title) => {
    Timetable.create(title).then((res) => {
      setTimetableTabIndex(timetables.length);
      userDispatch({
        type: USER_ACTIONS.CREATE_TIMETABLE,
        payload: { timetable: new Timetable(res.data) },
      });
      closeModal();
    });
  };

  const handleShareTimetable = () => {
    const shareLink = getShareLink(timetables[timetableTabIndex].id);
    copyToClipboard(shareLink);
    modalDispatch({ type: MODAL_ACTIONS.CLOSE });
    snackbarDispatch({ type: SNACKBAR_ACTIONS.ALERT_SHARE_LINK_COPIED });
  };

  const handleEditTimetable = (title) => {
    const id = timetables[timetableTabIndex].id;
    Timetable.updateTitle(id, title).then((res) => {
      userDispatch({
        type: USER_ACTIONS.UPDATE_TIMETABLE,
        payload: {
          timetable: { ...timetables[timetableTabIndex], title },
        },
      });
      closeModal();
    });
  };

  const handleDeleteTimetable = () => {
    const timetableId = timetables[timetableTabIndex].id;
    Timetable.delete(timetableId).then(() => {
      setTimetableTabIndex(
        timetableTabIndex !== 0 && timetableTabIndex === timetables.length - 1
          ? timetableTabIndex - 1
          : timetableTabIndex,
      );
      userDispatch({ type: USER_ACTIONS.DELETE_TIMETABLE, payload: { timetableId } });
      closeModal();
    });
  };

  const handleFeedbackReport = (feedback) => {
    User.reportFeedback(feedback).then(() => openSubmitConfirmModal());
  };

  const handleSubmit = () => {
    closeModal();
  };

  return (
    <Box className={classes.root}>
      <Header {...{ logout, openReportFeedbackModal }} />
      <Box className={classes.body}>
        {!hideSearchTab && (
          <SearchSection
            {...{
              lectures: [searchState.searchResults, bookmarks, timetableLectures, spikes],
              pagination: searchState.pagination,
              searchLoading: searchState.searchLoading,
              tabIndex: searchTabIndex,
              setTabIndex: setSearchTabIndex,
              handleSearchPageChange: (event, page) => getSearchResults(searchState.search, page),
              handleSearchSubmit: (search) => getSearchResults(search, 1),
              handleAddLectureClick,
              handleBookmarkLectureClick,
              handleUnbookmarkLectureClick,
              handleAddSpikeLectureClick,
              handleDeleteSpikeLectureClick,
              handleDeleteLectureClick: openDeleteLectureModal,
            }}
          />
        )}
        <TimetableSection
          {...{
            timetables,
            tabIndex: timetableTabIndex,
            setTabIndex: setTimetableTabIndex,
            lectures: timetableLectures,
            hideSearchTab,
            setHideSearchTab,
            handleDeleteLectureClick: openDeleteLectureModal,
            handleCreateTimetableClick: openCreateTimetableModal,
            handleDeleteTimetableClick: openDeleteTimetableModal,
            handleEditTimetableClick: openEditTimetableModal,
            handleShareTimetableClick: openShareTimetableModal,
          }}
        />
      </Box>
      <Snackbar {...{ ...snackbarState, onClose: closeSnackBar }} />
      <Footer />
      <Modal {...{ ...modalState, onClose: closeModal }} />
      <NewSemesterModal {...{ open: isNotiModalOpen, onClose: closeNotiModal }} />
    </Box>
  );
}
