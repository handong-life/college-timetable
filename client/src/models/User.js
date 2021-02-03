import { Axios } from '../lib/axios';
import { Timetable, BookmarkedLecture, SpikeLecture } from '.';

export default class User {
  constructor(raw) {
    this.id = raw.id;
    this.email = raw.email;
    this.timetables = raw.timetables.map(
      (timetable) => new Timetable(timetable, raw.bookmarks, raw.spikes),
    );
    this.bookmarks = raw.bookmarks.map((lecture) => new BookmarkedLecture(lecture));
    this.spikes = raw.spikes.map((lecture) => new SpikeLecture(lecture));
  }

  static getUser = async () => await Axios().get(`/user`);
  static getAuth = async () => await Axios().get('/auth');
  static reportFeedback = async (feedback) => await Axios().post(`/user/feedback`, { feedback });
  static bookmarkLecture = async (id) => await Axios().post(`/user/bookmark/${id}`);
  static unbookmarkLecture = async (id) => await Axios().delete(`/user/bookmark/${id}`);
  static addSpikeLecture = async (id) => await Axios().post(`/user/spike/${id}`);
  static deleteSpikeLecture = async (id) => await Axios().delete(`/user/spike/${id}`);
}
