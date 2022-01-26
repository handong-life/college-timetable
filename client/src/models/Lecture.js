import { Axios } from '../lib/axios';
import { isIn } from '../utils/helper';

export default class Lecture {
  constructor(raw, bookmarks = [], spikes = [], counts = {}) {
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
    this.isBookmarked = isIn(raw, bookmarks, 'id');
    this.isSpike = isIn(raw, spikes, 'id');
    this.isAdded = false;
  }

  static getSearchResults = async (search, page) =>
    await Axios().get(`/search?search=${search}${page ? `&page=${page}` : ''}`);
}

export class BookmarkedLecture extends Lecture {
  constructor(raw, spikes) {
    return { ...super(raw, [], spikes), isBookmarked: true };
  }
}

export class TimetableLecture extends Lecture {
  constructor(raw) {
    return { ...super(raw), isAdded: true };
  }
}

export class SpikeLecture extends Lecture {
  constructor(raw) {
    return { ...super(raw), isSpike: true };
  }
}
