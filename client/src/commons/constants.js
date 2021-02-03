export const STORAGE_KEY = {
  ACCESS_TOKEN: 'accessToken',
  LAST_NOTIFICATION_SEEN_AT: 'lastNotificationSeenAt',
};

export const SNACKBAR_DURATION = 2000;

export const TIMETABLE_DAYS = ['', '월', '화', '수', '목', '금'];
export const MAX_PERIOD = 9;

export const NOTIFICATION_POSTED_AT = new Date('2021-02-02');

export const SEARCH_TABS = {
  SEARCH: '강의 검색',
  BOOKMARKS: '즐겨 찾기',
  TIMETABLE: '현재 시간표',
  SPIKES: '이삭 줍기',
};

export const USER_ACTIONS = {
  BOOKMARK_LECTURE: 'bookmarkLecture',
  UNBOOKMARK_LECTURE: 'unbookmarkLecture',
  ADD_SPIKE_LECTURE: 'addSpikeLecture',
  DELETE_SPIKE_LECTURE: 'deleteSpikeLecture',
  ADD_LECTURE_TO_TIMETABLE: 'addLectureToTimetable',
  DELETE_LECTURE_FROM_TIMETABLE: 'deleteLectureFromTimetable',
  GET_TIMETABLE: 'getTimetable',
  CREATE_TIMETABLE: 'createTimetable',
  DELETE_TIMETABLE: 'deleteTimetable',
  UPDATE_TIMETABLE: 'updateTimetable',
};

export const SEARCH_ACTIONS = {
  START_SEARCH: 'startSearch',
  FINISH_SEARCH: 'finishSearch',
  REFLECT_BOOKMARKS: 'reflectBookmarks',
};

export const SNACKBAR_ACTIONS = {
  ALERT_NO_CURRENT_TIMETABLE: 'alertNoCurrentTimetable',
  ALERT_NO_SHAREABLE_TIMETABLE: 'alertNoShareableTimetable',
  ALERT_NO_EDITABLE_TIMETABLE: 'alertNoEditableTimetable',
  ALERT_NO_DELETABLE_TIMETABLE: 'alertNoDeletableTimetable',
  ALERT_LECTURE_EXACT_DUP: 'alertLectureExactDup',
  ALERT_LECTURE_NAME_DUP: 'alertLectureNameDup',
  ALERT_PERIOD_DUP: 'alertPeriodDup',
  ALERT_SHARE_LINK_COPIED: 'alertShareLinkCopied',
};

export const MODAL_ACTIONS = {
  OPEN_DELETE_LECTURE_MODAL: 'openDeleteLectureModal',
  OPEN_CREATE_TIMETABLE_MODAL: 'openCreateTimetableModal',
  OPEN_DELETE_TIMETABLE_MODAL: 'openDeleteTimetableModal',
  OPEN_EDIT_TIMETABLE_MODAL: 'openEditTimetableModal',
  OPEN_SHARE_TIMETABLE_MODAL: 'openShareTimetableModal',
  OPEN_FEEDBACK_MODAL: 'openFeedbackModal',
};
