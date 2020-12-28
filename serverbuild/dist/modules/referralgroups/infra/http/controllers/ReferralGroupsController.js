"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateReferralGroupService = _interopRequireDefault(require("../../../services/CreateReferralGroupService"));

var _ListReferralGroupsService = _interopRequireDefault(require("../../../services/ListReferralGroupsService"));

var _FindReferralGroupService = _interopRequireDefault(require("../../../services/FindReferralGroupService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ReferralGroupsController {
  async index(request, response) {
    const listReferralGroups = _tsyringe.container.resolve(_ListReferralGroupsService.default);

    const referralGroups = await listReferralGroups.execute();
    return response.status(200).json(referralGroups);
  }

  async create(request, response) {
    const {
      referral_id
    } = request.body;

    const createReferralGroup = _tsyringe.container.resolve(_CreateReferralGroupService.default);

    const referralGroup = await createReferralGroup.execute({
      referral_id
    });
    return response.status(201).json(referralGroup);
  }

  async find(request, response) {
    const {
      id
    } = request.params;

    const findReferralGroup = _tsyringe.container.resolve(_FindReferralGroupService.default);

    const referralGroup = await findReferralGroup.execute({
      referral_group_id: id
    });
    return response.status(200).json(referralGroup);
  }

}

var _default = ReferralGroupsController;
exports.default = _default;