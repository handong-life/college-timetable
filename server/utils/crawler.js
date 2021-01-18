require('dotenv').config();

const puppeteer = require('puppeteer');
const iconv = require('iconv-lite');
const HtmlTableToJson = require('html-table-to-json');

const { sequelize } = require('../models');
const Lecture = require('../models/lecture');

const LECTURE_COLUMNS = {
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

const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (1 + date.getMonth())).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
};

const today = getToday();

const delay = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const getLecture = (json) => ({
  gubun: json[LECTURE_COLUMNS.gubun],
  code: json[LECTURE_COLUMNS.code] + '-' + json[LECTURE_COLUMNS.bunban],
  name: json[LECTURE_COLUMNS.name].substr(0, json[LECTURE_COLUMNS.name].lastIndexOf('(')).trim(),
  hakbu: json[LECTURE_COLUMNS.info].includes('주간')
    ? json[LECTURE_COLUMNS.info].split('주')[0].trim()
    : '',
  professor: json[LECTURE_COLUMNS.info].includes('주간')
    ? json[LECTURE_COLUMNS.info].split('주간')[1]
    : json[LECTURE_COLUMNS.info],
  credit: +json[LECTURE_COLUMNS.credit],
  period: json[LECTURE_COLUMNS.period].includes('\n')
    ? json[LECTURE_COLUMNS.period].split('\n')[0].trim()
    : json[LECTURE_COLUMNS.period],
  roomNo: json[LECTURE_COLUMNS.roomNo],
  maxNum: +json[LECTURE_COLUMNS.maxNum] || null,
  curNum: +json[LECTURE_COLUMNS.curNum] || null,
  english: json[LECTURE_COLUMNS.english],
  gyoyang: json[LECTURE_COLUMNS.gyoyang],
  grading: json[LECTURE_COLUMNS.grading],
  pfPossible: json[LECTURE_COLUMNS.pfPossible] === 'Y',
  plan: json[LECTURE_COLUMNS.plan],
  crawledAt: today,
});

const getFile = async (page, url) =>
  page.evaluate((url) => {
    return new Promise(async (resolve) => {
      const reader = new FileReader();
      const response = await window.fetch(url);
      const data = await response.blob();
      debugger;
      reader.readAsBinaryString(data);
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject('Error occurred while reading binary string');
    });
  }, url);

const getJsonArrayFromFile = (fileString) => {
  const fileData = Buffer.from(fileString, 'binary');
  const decodedData = iconv.decode(fileData, 'ks_c_5601-1987');
  const parsedData = HtmlTableToJson.parse(decodedData);
  return parsedData.results[0];
};

const updateLectures = async (jsonArray) => {
  await sequelize.authenticate();
  await Promise.all(
    await jsonArray.map(async (json) => {
      const lectureObj = getLecture(json);
      const { gubun, code, name, professor, period } = lectureObj;
      const lecture = await Lecture.findOne({
        where: { gubun, code, name, professor, period },
      });
      if (lecture) {
        lecture.crawledAt = today;
        await lecture.save();
      } else {
        await Lecture.create(lectureObj);
      }
    }),
  );
};

const createLectures = async (jsonArray) => {
  await sequelize.authenticate();
  await Lecture.bulkCreate(jsonArray.map((json) => getLecture(json)));
};

const hisnetLogin = async (page) => {
  const hisnetID = process.env.HISNET_ID;
  const hisnetPW = process.env.HISNET_PW;

  await page.goto('https://hisnet.handong.edu/login/login.php');

  await page.evaluate(
    (id, pw) => {
      document.querySelector('input[name="id"]').value = id;
      document.querySelector('input[name="password"]').value = pw;
    },
    hisnetID,
    hisnetPW,
  );

  await page.click('input[src="/2012_images/intro/btn_login.gif"]');
  await delay(2000);
};

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await hisnetLogin(page);

  const fileString = await getFile(page, process.env.TIMETABLE_DOWNLOAD_URL);
  const jsonArray = getJsonArrayFromFile(fileString);

  console.log(jsonArray);
  // createLectures(jsonArray);
  // updateLectures(jsonArray);

  await browser.close();
})();
