
export default class User {

  userId;
  name;
  text;
  type;

  constructor(id, name, type, text) {
    this.userId = id;
    this.name = name;
    this.type = type;
    this.text = text;
  }
}
