import { useState, useEffect } from 'react';
import { USER_ACTIONS } from '../commons/constants';
import { BookmarkedLecture, User } from '../models';

const initialUserState = {
  bookmarks: [],
  timetables: [],
};

function userReducer(user, { type, payload }) {
  switch (type) {
    case USER_ACTIONS.BOOKMARK_LECTURE: {
      const { lecture } = payload;
      return { ...user, bookmarks: [...user.bookmarks, lecture] };
    }

    case USER_ACTIONS.UNBOOKMARK_LECTURE: {
      const { lectureId } = payload;
      return { ...user, bookmarks: [...user.bookmarks.filter(({ id }) => id !== lectureId)] };
    }

    case USER_ACTIONS.ADD_SPIKE_LECTURE: {
      const { lecture } = payload;
      return { ...user, spikes: [...user.spikes, lecture] };
    }

    case USER_ACTIONS.DELETE_SPIKE_LECTURE: {
      const { lectureId } = payload;
      return { ...user, spikes: [...user.spikes.filter(({ id }) => id !== lectureId)] };
    }

    case USER_ACTIONS.ADD_LECTURE_TO_TIMETABLE: {
      const { timetableId, lecture } = payload;
      const timetableIndex = user.timetables.findIndex(({ id }) => id === timetableId);
      const copiedTimetables = [...user.timetables];
      copiedTimetables[timetableIndex].lectures.push(lecture);
      return { ...user, timetables: copiedTimetables };
    }

    case USER_ACTIONS.DELETE_LECTURE_FROM_TIMETABLE: {
      const { timetableId, lectureId } = payload;
      const timetableIndex = user.timetables.findIndex(({ id }) => id === timetableId);
      const copiedTimetables = [...user.timetables];
      const filteredLectures = copiedTimetables[timetableIndex].lectures.filter(
        (lecture) => lecture.id !== lectureId,
      );
      copiedTimetables[timetableIndex].lectures = filteredLectures;
      return { ...user, timetables: copiedTimetables };
    }

    case USER_ACTIONS.CREATE_TIMETABLE: {
      const { timetable } = payload;
      return { ...user, timetables: [...user.timetables, timetable] };
    }

    case USER_ACTIONS.DELETE_TIMETABLE: {
      const { timetableId } = payload;
      const timetables = user.timetables.filter(({ id }) => id !== timetableId);
      return { ...user, timetables };
    }

    case USER_ACTIONS.UPDATE_TIMETABLE: {
      const { timetable } = payload;
      const timetableIndex = user.timetables.findIndex(({ id }) => id === timetable.id);
      const copiedTimetables = [...user.timetables];
      copiedTimetables[timetableIndex] = timetable;
      return { ...user, timetables: copiedTimetables };
    }

    default:
      return user;
  }
}

export default function useUser() {
  const [state, setState] = useState(initialUserState);

  function dispatch(action) {
    const nextState = userReducer(state, action);
    setState(nextState);
  }

  useEffect(() => {
    User.getUser().then(({ data }) => setState(new User(data)));
  }, []);

  useEffect(() => {
    setState((old) => {
      const bookmarks = old.bookmarks.map(
        (lecture) => new BookmarkedLecture(lecture, state.spikes),
      );
      return { ...old, bookmarks };
    });
  }, [state.spikes]);

  return [state, dispatch];
}
