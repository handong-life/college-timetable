import { useState } from 'react';
import { SNACKBAR_ACTIONS } from '../commons/constants';

const initialSnackbarState = {
  open: false,
  message: '',
};

function searchReducer(state, { type }) {
  switch (type) {
    case SNACKBAR_ACTIONS.ALERT_LECTURE_EXACT_DUP:
      return { open: true, message: '이미 시간표에 추가된 과목입니다!' };

    case SNACKBAR_ACTIONS.ALERT_LECTURE_NAME_DUP:
      return { open: true, message: '분반이 다른 같은 과목이 존재합니다!' };

    case SNACKBAR_ACTIONS.ALERT_PERIOD_DUP:
      return { open: true, message: '해당 시간에 다른 과목이 존재합니다!' };

    case SNACKBAR_ACTIONS.ALERT_NO_CURRENT_TIMETABLE:
      return { open: true, message: '현재 시간표가 없습니다!' };

    case SNACKBAR_ACTIONS.ALERT_NO_DELETABLE_TIMETABLE:
      return { open: true, message: '삭제할 시간표가 없습니다!' };

    case SNACKBAR_ACTIONS.ALERT_NO_EDITABLE_TIMETABLE:
      return { open: true, message: '수정할 시간표가 없습니다!' };

    case SNACKBAR_ACTIONS.ALERT_NO_SHAREABLE_TIMETABLE:
      return { open: true, message: '공유할 시간표가 없습니다!' };

    case SNACKBAR_ACTIONS.ALERT_SHARE_LINK_COPIED:
      return { open: true, message: '공유링크가 복사 되었습니다!', severity: 'info' };

    case SNACKBAR_ACTIONS.CLOSE: {
      return { ...state, ...initialSnackbarState };
    }

    default:
      return state;
  }
}

export default function useSnackbar() {
  const [state, setState] = useState(initialSnackbarState);

  function dispatch(action) {
    const nextState = searchReducer(state, action);
    setState(nextState);
  }

  function closeSnackbar() {
    setState({ ...state, ...initialSnackbarState });
  }

  return [state, dispatch, closeSnackbar];
}
