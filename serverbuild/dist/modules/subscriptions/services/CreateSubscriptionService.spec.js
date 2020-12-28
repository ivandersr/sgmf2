"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../repositories/fakes/FakeSubscriptionsRepository"));

var _CreateSubscriptionService = _interopRequireDefault(require("./CreateSubscriptionService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeSubscriptionsRepository;
let createSubscription;
describe('CreateSubscriptionService', () => {
  beforeEach(() => {
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    createSubscription = new _CreateSubscriptionService.default(fakeSubscriptionsRepository);
  });
  it('should be able to create a subscription', async () => {
    const subscription = await createSubscription.execute({
      title: 'Plano de testes',
      value: 100
    });
    expect(subscription).toHaveProperty('id');
    expect(subscription.title).toBe('Plano de testes');
    expect(subscription.value).toBe(100);
  });
  it('should not be able to create a subscription with empty title', async () => {
    await expect(createSubscription.execute({
      title: '',
      value: 100
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create a subscription with invalid value', async () => {
    await expect(createSubscription.execute({
      title: 'Plano de testes',
      value: -1
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});