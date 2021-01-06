export default class User {
  constructor(raw) {
    this.id = raw.id;
    this.email = raw.email;
  }
}
