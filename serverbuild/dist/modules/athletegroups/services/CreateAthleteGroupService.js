"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IAthleteGroupsRepository = _interopRequireDefault(require("../repositories/IAthleteGroupsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateAthleteGroupService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AthleteGroupsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAthleteGroupsRepository.default === "undefined" ? Object : _IAthleteGroupsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateAthleteGroupService {
  constructor(athleteGroupsRepository) {
    this.athleteGroupsRepository = athleteGroupsRepository;
  }

  async execute({
    title,
    description
  }) {
    if (!title) {
      throw new _AppError.default(400, 'Título do grupo deve ser preenchido');
    }

    if (!description) {
      throw new _AppError.default(400, 'Descrição do grupo deve ser preenchida.');
    }

    const athleteGroup = await this.athleteGroupsRepository.create({
      title,
      description
    });
    return athleteGroup;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreateAthleteGroupService;
exports.default = _default;