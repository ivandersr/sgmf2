"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _ISubscriptionsRepository = _interopRequireDefault(require("../repositories/ISubscriptionsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListSubscriptionsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('SubscriptionsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ISubscriptionsRepository.default === "undefined" ? Object : _ISubscriptionsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListSubscriptionsService {
  constructor(subscriptionsRepository) {
    this.subscriptionsRepository = subscriptionsRepository;
  }

  async execute({
    page,
    pageSize
  }) {
    if (!page || !pageSize) {
      const [subscriptions, total] = await this.subscriptionsRepository.findAndCount();
      return {
        subscriptions,
        total,
        pages: 1
      };
    }

    if (isNaN(Number(page)) || isNaN(Number(pageSize))) {
      throw new _AppError.default(400, 'A página e seu tamanho devem ser numéricos');
    }

    const [subscriptions, total] = await this.subscriptionsRepository.findAndCount({
      skip: Number(page) * Number(pageSize),
      take: Number(pageSize),
      order: {
        title: 'ASC'
      }
    });
    const pages = Math.ceil(total / Number(pageSize));
    return {
      subscriptions,
      total,
      pages
    };
  }

}) || _class) || _class) || _class) || _class);
var _default = ListSubscriptionsService;
exports.default = _default;