"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreateSubscriptionService = _interopRequireDefault(require("../../../services/CreateSubscriptionService"));

var _ListSubscriptionsService = _interopRequireDefault(require("../../../services/ListSubscriptionsService"));

var _UpdateSubscriptionService = _interopRequireDefault(require("../../../services/UpdateSubscriptionService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SubscriptionsController {
  async index(request, response) {
    const {
      page,
      pageSize
    } = request.query;

    const listSubscriptions = _tsyringe.container.resolve(_ListSubscriptionsService.default);

    const subscriptions = await listSubscriptions.execute({
      page: String(page),
      pageSize: String(pageSize)
    });
    return response.status(200).json(subscriptions);
  }

  async create(request, response) {
    const {
      title,
      value
    } = request.body;

    const createSubscription = _tsyringe.container.resolve(_CreateSubscriptionService.default);

    const subscription = await createSubscription.execute({
      title,
      value
    });
    return response.status(201).json(subscription);
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      title,
      value
    } = request.body;

    const updateSubscription = _tsyringe.container.resolve(_UpdateSubscriptionService.default);

    const subscription = await updateSubscription.execute({
      id,
      title,
      value
    });
    return response.status(200).json(subscription);
  }

}

var _default = SubscriptionsController;
exports.default = _default;