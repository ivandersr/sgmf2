"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../repositories/fakes/FakeSubscriptionsRepository"));

var _UpdateSubscriptionService = _interopRequireDefault(require("./UpdateSubscriptionService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeSubscriptionsRepository;
let updateSubscription;
describe('UpdateSubscriptionService', () => {
  beforeEach(() => {
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    updateSubscription = new _UpdateSubscriptionService.default(fakeSubscriptionsRepository);
  });
  it('should be able to update subscription\'s details', async () => {
    const subscription = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    const updatedSubscription = await updateSubscription.execute({
      id: subscription.id,
      title: 'Plano atualizado',
      value: 50
    });
    expect(updatedSubscription.id).toBe(subscription.id);
    expect(updatedSubscription.title).toBe('Plano atualizado');
    expect(updatedSubscription.value).toBe(50);
  });
  it('should throw an exception if subscription is not found', async () => {
    await expect(updateSubscription.execute({
      id: 'id inválido',
      title: 'Plano atualizado',
      value: 50
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});