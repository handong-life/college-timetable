import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './style.scss';
import { SearchBar, LectureCard, Timetable } from '../../components';
import { SERVERURL } from '../../commons/constants';

export default function TimetablePage({ location }) {
  const [search, setSearch] = useState('');
  const [selectedTapIndex, setSelectedTapIndex] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  const tabs = ['강의 검색', '강의 즐겨찾기'];

  useEffect(() => {
    axios.get(`${SERVERURL}/api/lecture/bookmark`).then((res) => {
      setBookmarks(res.data.map((lecture) => ({ ...lecture, isBookmarked: true })));
    });
  }, []);

  useEffect(() => {
    if (search.length !== 0) {
      axios.get(`${SERVERURL}/api/lecture/search?search=${search}`).then((res) =>
        setSearchResults(
          res.data.map((lecture) => ({
            ...lecture,
            isBookmarked: bookmarks.find((bookmark) => bookmark.id === lecture.id),
          })),
        ),
      );
    }
  }, [search]);

  const onBookmarkClick = (lecture) => {
    axios.post(`${SERVERURL}/api/lecture/bookmark/${lecture.id}`).then((res) => {
      setBookmarks([...bookmarks, lecture]);
      const id = searchResults.findIndex((result) => result.id === lecture.id);
      if (id === -1) return;
      const newSearchResults = [...searchResults];
      newSearchResults[id].isBookmarked = true;
      setSearchResults(newSearchResults);
    });
  };

  const onUnbookmarkClick = (lecture) => {
    axios.delete(`${SERVERURL}/api/lecture/bookmark/${lecture.id}`).then((res) => {
      setBookmarks([...bookmarks.filter((bookmark) => bookmark.id != lecture.id)]);
      const id = searchResults.findIndex((result) => result.id === lecture.id);
      if (id === -1) return;
      const newSearchResults = [...searchResults];
      newSearchResults[id].isBookmarked = false;
      setSearchResults(newSearchResults);
    });
  };

  const onAddClick = (lecture) => {
    bookmarks.find((id) => id === lecture.id);
  };

  return (
    <div className="TimetablePage">
      <div className="Header">
        <div className="Icon">🗓</div>
        <div className="TimetableTitle">대학시간</div>
      </div>
      <div className="Body">
        <div className="SearchTabWrapper">
          <div className="TabBar">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`Chip ${selectedTapIndex === index && 'selected'}`}
                onClick={() => setSelectedTapIndex(index)}
              >
                {tab}
              </div>
            ))}
          </div>
          <div className="SearchTab">
            {selectedTapIndex === 0 ? (
              <>
                <SearchBar onSearchSubmit={(search) => setSearch(search)} />
                <div className="LectureList">
                  {searchResults.map((lecture) => (
                    <LectureCard
                      key={lecture.id}
                      lecture={lecture}
                      onAddClick={() => onAddClick(lecture)}
                      onBookmarkClick={() => onBookmarkClick(lecture)}
                      onUnbookmarkClick={() => onUnbookmarkClick(lecture)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="LectureList">
                {bookmarks.map((lecture) => (
                  <LectureCard
                    key={lecture.id}
                    lecture={lecture}
                    onAddClick={() => onAddClick(lecture)}
                    onUnbookmarkClick={() => onUnbookmarkClick(lecture)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="TimetableTab">
          <Timetable />
        </div>
      </div>
    </div>
  );
}
