"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../../config/auth"));

var _AppError = _interopRequireDefault(require("../../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.default(401, 'O JWT não está presente.');
  }

  const [, token] = authHeader.split(' ');

  try {
    (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    return next();
  } catch (err) {
    throw new _AppError.default(401, 'JWT inválido.');
  }
}

var _default = ensureAuthenticated;
exports.default = _default;