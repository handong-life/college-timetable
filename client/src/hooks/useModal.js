import { useState } from 'react';
import { MODAL_ACTIONS } from '../commons/constants';

const initialModalState = {
  open: false,
  onSubmit: () => {},
  isInputRequired: false,
  text: {
    title: '',
    placeholder: '',
    button: '',
  },
};

const getOpenModalState = ({ onSubmit, isInputRequired = true, text }) => ({
  open: true,
  isInputRequired,
  onSubmit,
  text,
});

function searchReducer(state, { type, payload }) {
  switch (type) {
    case MODAL_ACTIONS.OPEN_DELETE_LECTURE_MODAL: {
      const { onSubmit, lectureName } = payload;
      return getOpenModalState({
        onSubmit,
        isInputRequired: false,
        text: {
          title: `'${lectureName}'을(를) 삭제하시겠습니까?`,
          button: '확인',
        },
      });
    }

    case MODAL_ACTIONS.OPEN_CREATE_TIMETABLE_MODAL: {
      const { onSubmit } = payload;
      return getOpenModalState({
        onSubmit,
        text: {
          title: '시간표를 생성하시겠습니까?',
          placeholder: '시간표 이름',
          button: '생성',
        },
      });
    }

    case MODAL_ACTIONS.OPEN_DELETE_TIMETABLE_MODAL: {
      const { onSubmit, timetableTitle } = payload;
      return getOpenModalState({
        onSubmit,
        isInputRequired: false,
        text: {
          title: `'${timetableTitle}'을(를) 삭제하시겠습니까?`,
          button: '확인',
        },
      });
    }

    case MODAL_ACTIONS.OPEN_EDIT_TIMETABLE_MODAL: {
      const { onSubmit } = payload;
      return getOpenModalState({
        onSubmit,
        text: {
          title: '시간표 이름을 변경하시겠습니까?',
          placeholder: '시간표 이름',
          button: '변경',
        },
      });
    }

    case MODAL_ACTIONS.OPEN_SHARE_TIMETABLE_MODAL: {
      const { onSubmit } = payload;
      return getOpenModalState({
        onSubmit,
        isInputRequired: false,
        text: {
          title: '공유 링크를 복사하시겠습니까?',
          button: '복사',
        },
      });
    }

    case MODAL_ACTIONS.OPEN_FEEDBACK_MODAL: {
      const { onSubmit } = payload;
      return getOpenModalState({
        onSubmit,
        text: {
          title: '버그나 피드백을 남겨주세요!',
          placeholder: '버그, 피드백',
          button: '제출',
        },
      });
    }

    case MODAL_ACTIONS.OPEN_SUBMIT_CONFIRM_MODAL: {
      const { onSubmit } = payload;
      return getOpenModalState({
        onSubmit,
        isInputRequired: false,
        text: {
          title: `소중한 의견 감사합니다! 빠른 시일 내에 반영하도록 하겠습니다 😊`,
          button: '확인',
        },
      });
    }

    default:
      return state;
  }
}

export default function useModal() {
  const [state, setState] = useState(initialModalState);

  function dispatch(action) {
    const nextState = searchReducer(state, action);
    setState(nextState);
  }

  function closeModal() {
    setState({ ...initialModalState });
  }

  return [state, dispatch, closeModal];
}
