"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IAthletesRepository = _interopRequireDefault(require("../repositories/IAthletesRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let FindAthletesByNameService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AthletesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAthletesRepository.default === "undefined" ? Object : _IAthletesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindAthletesByNameService {
  constructor(athletesRepository) {
    this.athletesRepository = athletesRepository;
  }

  async execute({
    text,
    page,
    pageSize
  }) {
    if (!text) {
      if (!page || !pageSize) {
        const [athletes, total] = await this.athletesRepository.findAndCount();
        return {
          athletes,
          total,
          pages: 1
        };
      }

      if (isNaN(Number(page)) || isNaN(Number(pageSize))) {
        throw new _AppError.default(400, 'A página e seu tamanho devem ser numéricos');
      }

      const [athletes, total] = await this.athletesRepository.findAndCount({
        skip: Number(page) * Number(pageSize),
        take: Number(pageSize),
        order: {
          name: 'ASC'
        }
      });
      const pages = Math.ceil(total / Number(pageSize));
      return {
        athletes,
        total,
        pages
      };
    }

    if (!page || !pageSize) {
      const [athletes, total] = await this.athletesRepository.findByName({
        text
      });
      return {
        athletes,
        total,
        pages: 1
      };
    }

    if (isNaN(Number(page)) || isNaN(Number(pageSize))) {
      throw new _AppError.default(400, 'A página e seu tamanho devem ser numéricos');
    }

    const [athletes, total] = await this.athletesRepository.findByName({
      text,
      skip: Number(page) * Number(pageSize),
      take: Number(pageSize),
      order: {
        name: 'ASC'
      }
    });
    const pages = Math.ceil(total / Number(pageSize));
    return {
      athletes,
      total,
      pages
    };
  }

}) || _class) || _class) || _class) || _class);
var _default = FindAthletesByNameService;
exports.default = _default;