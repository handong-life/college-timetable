exports.HTTP_STATUS = {
  SUCCESS: 200,
  CREATE_SUCCESS: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  DUPLICATED: 409,
  SERVER_ERROR: 500,
};

exports.LECTURE_COLUMNS = {
  gubun: '구      분',
  code: '과목코드',
  bunban: '분      반',
  name: '과목명\n      (CourseName)',
  credit: '학점',
  info: '개설정보',
  period: '시간\n      (Period)',
  roomNo: '강의실',
  maxNum: '정원',
  curNum: '인원',
  english: '영어',
  gyoyang: '교양\n      실무',
  grading: '성적유형',
  pfPossible: 'PF병행',
  plan: '강의\n\t  계획서',
};
