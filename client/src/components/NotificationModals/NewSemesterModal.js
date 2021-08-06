import React from 'react';
import { Modal, Paper, Box, Typography, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 0,
    width: 350,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),
  },

  titleText: {
    margin: '0 0 10px 3px',
    textAlign: 'center',
  },

  bodyText: {
    color: 'secondary',
    textAlign: 'center',
  },

  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function NewSemesterModal({ open, onClose }) {
  const classes = useStyles();

  return (
    <Modal className={classes.root} open={open} onClose={onClose}>
      <Paper className={classes.modal}>
        <Typography className={classes.titleText} variant="h3">
          2021년도 2학기 서비스 안내 🚀
        </Typography>
        <Typography className={classes.bodyText} variant="body1">
          재학생 여러분 안녕하세요~!
          <br />한 학기가 정말 빠르게 흘러갔네요🤪
          <br />
          <br />
          조금씩 다음 학기를 준비할 여러분을 위해
          <br />
          2학기에도 대학시간을 서비스 하게 되었습니다!
          <br />
          <br />
          이삭줍기 서비스도 수강 신청이 시작되면
          <br />
          지난학기와 동일하게 진행될 예정입니다.🌾
          <br />
          <br />
          그럼 수강신청 스트레스가 덜한
          <br /> 행복한 방학이 되길 <strong>대학시간</strong>이 응원하겠습니다!☘️
          <br />
          <br />
        </Typography>

        <Box className={classes.buttonBox}>
          <Button variant="contained" color="secondary" onClick={onClose}>
            <Typography variant="body2">확인</Typography>
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}
