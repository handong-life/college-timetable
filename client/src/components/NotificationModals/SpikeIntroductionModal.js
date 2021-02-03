import React from 'react';
import { Modal, Paper, Box, Typography, Button, makeStyles } from '@material-ui/core';
import EcoOutlinedIcon from '@material-ui/icons/EcoOutlined';

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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 3),

    [theme.breakpoints.down('sm')]: {
      width: 350,
    },
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

export default function SpikeIntroductionModal({ open, onClose }) {
  const classes = useStyles();

  return (
    <Modal className={classes.root} open={open} onClose={onClose}>
      <Paper className={classes.modal}>
        <Typography className={classes.titleText} variant="h3">
          🧩 이삭 줍기 서비스 소개
        </Typography>
        <Typography className={classes.bodyText} variant="body1">
          원하시는 과목을 모두 잡으셨으면 좋겠지만,
          <br />
          아깝게 놓치신 분들도 계실 것 같습니다!
          <br />
          그런 분들을 위해 <strong>이삭줍기</strong>를 서비스하게 되었습니다!
          <br />
          <br />
          <EcoOutlinedIcon style={{ fontSize: 30 }} />을 이용해서 이삭줍기에 과목을 담으시면 <br />
          5~10분마다 주기적으로 수강 현황을 확인하여 <br />
          <strong>이삭(수강 공석) 발견 시 이메일로 알려드리려 합니다!</strong>
          <br />
        </Typography>

        <Typography className={classes.bodyText} variant="body1">
          <br />
          그리고 그동안
          <br />
          450분 정도가 대학시간을 이용해주셨는데요!
          <br />
          부족함이 많았음에도 많이 사용해주시고
          <br />
          적극적으로 피드백 주셨던 모든 분들 감사합니다!🙏
          <br />
          <br />
          대학시간도 수강신청 끝나는 날까지
          <br />
          잘 서비스 될 수 있도록 노력하겠습니다!🤓
          <br />
          <br />
          <strong>그럼 남은 수강신청도 모두 화이팅하세요!🤗</strong>
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
