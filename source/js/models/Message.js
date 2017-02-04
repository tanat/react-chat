
export default class User {

  userId;
  text;
  type;

  constructor(id, type, text) {
    this.userId = id;
    this.type = type;
    this.text = text;
  }
}
