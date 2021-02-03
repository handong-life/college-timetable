import { Axios } from '../lib/axios';
import { TimetableLecture } from './Lecture';

export default class Timetable {
  constructor(raw, bookmarks = [], spikes = []) {
    this.id = raw.id;
    this.title = raw.title;
    this.lectures = raw.lectures
      ? raw.lectures.map((lecture) => new TimetableLecture(lecture, bookmarks, spikes))
      : [];
  }

  static create = async (title) => await Axios().post(`/timetable`, { title });
  static updateTitle = async (id, title) => await Axios().put(`/timetable`, { id, title });
  static delete = async (id) => await Axios().delete(`/timetable/${id}`);
  static getBySharedId = async (sharedId) => await Axios().get(`/share/${sharedId}`);
  static addLecture = async (timetableId, lectureId) =>
    await Axios().post(`/timetable/lecture/${timetableId}/${lectureId}`);
  static deleteLecture = async (timetableId, lectureId) =>
    await Axios().delete(`/timetable/lecture/${timetableId}/${lectureId}`);
}
