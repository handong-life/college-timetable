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
      const { search, lectures, page, pages, bookmarks, spikes } = payload;
      return {
        search,
        searchResults: lectures.map((lecture) => new Lecture(lecture, bookmarks, spikes)),
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

export default function useSearch(bookmarks = [], spikes = []) {
  const [state, setState] = useState(initialSearchState);

  function dispatch(action) {
    const nextState = searchReducer(state, action);
    setState(nextState);
  }

  useEffect(() => {
    setState((old) => {
      const searchResults = old.searchResults.map(
        (lecture) => new Lecture(lecture, bookmarks, spikes),
      );
      return { ...old, searchResults };
    });
  }, [bookmarks, spikes]);

  return [state, dispatch];
}
