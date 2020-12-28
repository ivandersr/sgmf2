"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../../infra/typeorm/entities/User"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUsersRepository {
  constructor() {
    this.users = [];
  }

  async findOne({
    user_id
  }) {
    const findUser = this.users.find(user => user.id === user_id);
    return findUser;
  }

  async findByLogin({
    login
  }) {
    const findUser = this.users.find(user => user.login === login);
    return findUser;
  }

  async create({
    login,
    name,
    phoneNumber,
    password
  }) {
    const user = new _User.default();
    Object.assign(user, {
      id: (0, _uuid.v4)(),
      login,
      name,
      phoneNumber,
      password
    });
    this.users.push(user);
    return user;
  }

  async save(data) {
    const userIndex = this.users.findIndex(user => user.id === data.id);

    if (userIndex !== -1) {
      this.users[userIndex] = data;
      return data;
    }

    this.users.push(data);
    return data;
  }

}

var _default = FakeUsersRepository;
exports.default = _default;