"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(request, response) {
    const {
      login,
      name,
      password,
      phoneNumber
    } = request.body;

    const createUserService = _tsyringe.container.resolve(_CreateUserService.default);

    const user = await createUserService.execute({
      login,
      name,
      password,
      phoneNumber
    }); // delete user.password;

    return response.status(201).json(user);
  }

}

var _default = UsersController;
exports.default = _default;