export default class Timetable {
  constructor(raw) {
    this.id = raw.id;
    this.title = raw.title;
    this.lectures = raw.lectures;
  }
}
