export default class Lecture {
  constructor(raw) {
    this.id = raw.id;
    this.gubun = raw.gubun;
    this.code = raw.code;
    this.hakbu = raw.hakbu;
    this.professor = raw.professor;
    this.name = raw.name;
    this.credit = raw.credit;
    this.period = raw.period;
    this.roomNo = raw.roomNo;
    this.maxNum = raw.maxNum;
    this.curNum = raw.curNum;
    this.english = raw.english;
    this.gyoyang = raw.gyoyang;
    this.grading = raw.grading;
    this.pfPossible = raw.pfPossible;
    this.crawledAt = raw.crawledAt;
    this.isBookmarked = true;
    this.isAdded = false;
  }
}
