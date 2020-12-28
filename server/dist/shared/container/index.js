"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers");

var _AthleteGroupsRepository = _interopRequireDefault(require("../../modules/athletegroups/infra/typeorm/repositories/AthleteGroupsRepository"));

var _AthletesRepository = _interopRequireDefault(require("../../modules/athletes/infra/typeorm/repositories/AthletesRepository"));

var _SubscriptionsRepository = _interopRequireDefault(require("../../modules/subscriptions/infra/typeorm/repositories/SubscriptionsRepository"));

var _PaymentsRepository = _interopRequireDefault(require("../../modules/payments/infra/typeorm/repositories/PaymentsRepository"));

var _ReferralGroupsRepository = _interopRequireDefault(require("../../modules/referralgroups/infra/typeorm/repositories/ReferralGroupsRepository"));

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('AthleteGroupsRepository', _AthleteGroupsRepository.default);

_tsyringe.container.registerSingleton('AthletesRepository', _AthletesRepository.default);

_tsyringe.container.registerSingleton('SubscriptionsRepository', _SubscriptionsRepository.default);

_tsyringe.container.registerSingleton('PaymentsRepository', _PaymentsRepository.default);

_tsyringe.container.registerSingleton('ReferralGroupsRepository', _ReferralGroupsRepository.default);

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);