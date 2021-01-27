import React from 'react';
import { IconButton, ButtonGroup, Tooltip, makeStyles } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles((theme) => ({
  root: {
    alignSelf: 'flex-end',
    height: 40,
    borderRadius: '23px',
    backgroundColor: 'white',
    marginBottom: '5px',
  },
}));

export default function TimetableButtonGroup({
  handleCreateTimetableClick,
  handleEditTimetableClick,
  handleDeleteTimetableClick,
  handleShareTimetableClick,
}) {
  const classes = useStyles();

  return (
    <ButtonGroup size="small" className={classes.root}>
      <Tooltip title="시간표 생성" arrow>
        <IconButton onClick={handleCreateTimetableClick}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="시간표 이름 수정" arrow>
        <IconButton onClick={handleEditTimetableClick}>
          <CreateIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="시간표 삭제" arrow>
        <IconButton onClick={handleDeleteTimetableClick}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="시간표 공유" arrow>
        <IconButton onClick={handleShareTimetableClick}>
          <ShareIcon />
        </IconButton>
      </Tooltip>
    </ButtonGroup>
  );
}
