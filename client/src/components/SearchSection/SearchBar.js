import React, { useRef, useState } from 'react';
import { InputBase, Box, makeStyles } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '60px',
    width: '100%',
    padding: '8px',
  },

  searchBar: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingLeft: '8px',
    marginBottom: '15px',
    borderRadius: '10px',
    border: '1px solid #dfe1e5',

    '&:hover': {
      borderColor: 'rgba(223,225,229,0)',
      boxShadow: '0 1px 6px rgba(32,33,36,.28)',
    },

    [theme.breakpoints.down('sm')]: {
      margin: '0 0 5px',
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

export default function SearchBar({ initialSearch = '', handleSearchSubmit }) {
  const classes = useStyles();
  const clearIconRef = useRef();
  const inputRef = useRef();
  const [search, setSearch] = useState(initialSearch);

  const onSubmit = (e) => {
    e.preventDefault();
    if (search.trim().length !== 0) handleSearchSubmit(search.trim());
  };

  return (
    <Box className={classes.root}>
      <form className={classes.searchBar} onSubmit={(e) => onSubmit(e)} role="search">
        <SearchIcon className={classes.icon} />
        <InputBase
          ref={inputRef}
          className={classes.input}
          autoComplete="off"
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
    </Box>
  );
}
