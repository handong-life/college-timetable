import { useState, useEffect } from 'react';
import { SEARCH_ACTIONS } from '../commons/constants';
import { Lecture } from '../models';

const initialSearchState = {
  search: '',
  pagination: {
    total: 0,
    current: 0,
  },
  searchResults: [],
  searchLoading: false,
};

function searchReducer(state, { type, payload }) {
  switch (type) {
    case SEARCH_ACTIONS.START_SEARCH: {
      return { ...state, searchLoading: true };
    }

    case SEARCH_ACTIONS.FINISH_SEARCH: {
      const { search, lectures, page, pages, bookmarks } = payload;
      return {
        search,
        searchResults: lectures.map((lecture) => new Lecture(lecture, bookmarks)),
        searchLoading: false,
        pagination: {
          total: pages,
          current: pages === 0 ? 0 : page,
        },
      };
    }

    default:
      return state;
  }
}

export default function useSearch(bookmarks = []) {
  const [state, setState] = useState(initialSearchState);

  function dispatch(action) {
    const nextState = searchReducer(state, action);
    setState(nextState);
  }

  useEffect(() => {
    const searchResults = state.searchResults.map((lecture) => new Lecture(lecture, bookmarks));
    setState({ ...state, searchResults });
  }, [bookmarks]);

  return [state, dispatch];
}
