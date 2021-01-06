require('dotenv').config();

const puppeteer = require('puppeteer');
const fs = require('fs');
const iconv = require('iconv-lite');
const HtmlTableToJson = require('html-table-to-json');

const { LECTURE_COLUMNS } = require('../constants');
const { sequelize } = require('../models');
const Lecture = require('../models/lecture');

const { delay, getToday } = require('./helper');
const today = getToday();

function updateDB() {
  sequelize
    .authenticate()
    .then(() => console.log('🚀Connection Created!'))
    .catch((err) => {
      console.log(err);
    });

  fs.createReadStream(__dirname + `/../data/csv/${today}.xls`)
    .pipe(iconv.decodeStream('ks_c_5601-1987'))
    .pipe(iconv.encodeStream('utf-8'))
    .collect(async function (err, body) {
      //   console.log(body);
      const html = body.toString('utf-8');
      //   console.log(html);
      const converted = HtmlTableToJson.parse(html);

      await Promise.all(
        await converted.results[0].map(async (json) => {
          //   console.log(json);
          const lectureObj = {
            gubun: json[LECTURE_COLUMNS.gubun],
            code: json[LECTURE_COLUMNS.code] + '-' + json[LECTURE_COLUMNS.bunban],
            name: json[LECTURE_COLUMNS.name]
              .substr(0, json[LECTURE_COLUMNS.name].lastIndexOf('('))
              .trim(),
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
          };
          const { gubun, code, name } = lectureObj;
          const lecture = await Lecture.findOne({
            where: { gubun, code, name },
          });
          if (lecture) {
            lecture.setDataValue(lectureObj);
            await lecture.save();
          } else {
            await Lecture.create(lectureObj);
          }
        }),
      );
    });
}

(async () => {
  console.log('hi');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const hisnetID = process.env.HISNET_ID;
  const hisnetPW = process.env.HISNET_PW;

  //페이지로 가라
  await page.goto('https://hisnet.handong.edu/login/login.php');

  //아이디랑 비밀번호 란에 값을 넣어라
  await page.evaluate(
    (id, pw) => {
      document.querySelector('input[name="id"]').value = id;
      document.querySelector('input[name="password"]').value = pw;
    },
    hisnetID,
    hisnetPW,
  );

  //로그인 버튼을 클릭해라
  // await page.click('input[src="/2012_images/intro/btn_login.gif"]');
  // await delay(2000);
  // const res = await page.evaluate(() => {
  //   return fetch(
  //     'https://hisnet.handong.edu/for_student/course/PLES333X.php?hak_year=2021&hak_term=1&gwamok=&gwamok_code=&hakbu=%C0%FC%C3%BC&isugbn=%C0%FC%C3%BC&injung=%C0%FC%C3%BC&prof_name=',
  //   ).then((r) => r.text());
  // });
  // res를 받아서 update하고 싶었는데 puppeteer로 받아온게 뭔가 문제가 있음..
  // 현재는 그냥 내가 다운로드한 파일로 업데이트하도록 해놨다.
  updateDB();
  await browser.close();
})();
