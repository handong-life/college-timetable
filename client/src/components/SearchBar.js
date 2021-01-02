import React, { useRef, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '50px',
    paddingLeft: '8px',
    marginBottom: '15px',
    borderRadius: '10px',
    border: '1px solid #dfe1e5',

    '&:hover': {
      borderColor: 'rgba(223,225,229,0)',
      boxShadow: '0 1px 6px rgba(32,33,36,.28)',
    },
  },

  icon: {
    marginRight: '7px',
  },

  input: {
    width: '100%',
    background: 'transparent',
    border: 'none',
    margin: 0,
    padding: 0,
    color: 'rgba(0,0,0,.87)',
    outline: 'none',
    display: 'flex',
    fontSize: '16px',
  },
}));

export default function SearchBar({ initialSearch = '', onSearchSubmit }) {
  const classes = useStyles();
  const clearIconRef = useRef();
  const inputRef = useRef();
  const [search, setSearch] = useState(initialSearch);

  const onSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(search);
  };

  return (
    <form className={classes.root} onSubmit={(e) => onSubmit(e)} role="search">
      <SearchIcon className={classes.icon} />
      <InputBase
        ref={inputRef}
        className={classes.input}
        name="search"
        placeholder="강의명, 교수, 학부, 과목코드, 시간(ex. 화8)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search.length !== 0 && (
        <IconButton
          ref={clearIconRef}
          onClick={() => {
            setSearch('');
            inputRef.current.focus();
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </form>
    // <form className="SearchForm" onSubmit={(e) => onSubmit(e)} role="search">
    //   <div className="SearchBar">
    //     <div className="SearchIconWrapper">
    //       <div className="f7-icons SearchIcon">search</div>
    //     </div>

    //     <input
    //       className="SearchInput"
    //       name="search"
    //       placeholder="강의명, 교수, 학부, 과목코드, 시간(ex. 화8)"
    //       value={search}
    //       onChange={(e) => setSearch(e.target.value)}
    //     />

    //     <div
    //       className="ClearIconWrapper"
    //       ref={clearIconRef}
    //       hidden={search.length === 0}
    //       onClick={() => {
    //         setSearch('');
    //         inputRef.current.focus();
    //       }}
    //     >
    //       <div className="f7-icons ClearIcon">multiply</div>
    //     </div>
    //   </div>
    // </form>
  );
}
