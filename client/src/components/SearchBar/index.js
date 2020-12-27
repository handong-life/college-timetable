import React, { useRef, useState } from 'react';
import './style.scss';

export default function SearchBar({ initialSearch = '', onSearchSubmit }) {
  const clearIconRef = useRef();
  const inputRef = useRef();
  const [search, setSearch] = useState(initialSearch);

  const onSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(search);
  };

  return (
    <form className="SearchForm" onSubmit={(e) => onSubmit(e)} role="search">
      <div className="SearchBar">
        <div className="SearchIconWrapper">
          <div className="f7-icons SearchIcon">search</div>
        </div>

        <input
          className="SearchInput"
          name="search"
          placeholder="강의명, 교수, 학부, 과목코드, 시간(ex. 화8)"
          value={search}
          ref={inputRef}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div
          className="ClearIconWrapper"
          ref={clearIconRef}
          hidden={search.length === 0}
          onClick={() => {
            setSearch('');
            inputRef.current.focus();
          }}
        >
          <div className="f7-icons ClearIcon">multiply</div>
        </div>
      </div>
    </form>
  );
}
