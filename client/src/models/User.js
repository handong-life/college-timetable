import { Axios } from '../lib/axios';
import { Timetable, BookmarkedLecture } from '.';

export default class User {
  constructor(raw) {
    this.id = raw.id;
    this.email = raw.email;
    this.timetables = raw.timetables.map((timetable) => new Timetable(timetable, raw.lectures));
    this.bookmarks = raw.lectures.map((lecture) => new BookmarkedLecture(lecture));
  }

  static getUser = async () => await Axios().get(`/user`);
  static getAuth = async () => await Axios().get('/auth');
  static reportFeedback = async (feedback) => await Axios().post(`/user/feedback`, { feedback });
  static bookmarkLecture = async (id) => await Axios().post(`/user/bookmark/${id}`);
  static unbookmarkLecture = async (id) => await Axios().delete(`/user/bookmark/${id}`);
}
