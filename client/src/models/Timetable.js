import { Lecture } from '.';

export default class Timetable {
  constructor(raw) {
    this.id = raw.id;
    this.title = raw.title;
    this.lectures = raw.lectures ? raw.lectures.map((lecture) => new Lecture(lecture)) : [];
  }
}
