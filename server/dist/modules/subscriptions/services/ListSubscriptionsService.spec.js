"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeSubscriptionsRepository = _interopRequireDefault(require("../repositories/fakes/FakeSubscriptionsRepository"));

var _ListSubscriptionsService = _interopRequireDefault(require("./ListSubscriptionsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeSubscriptionsRepository;
let listSubscriptions;
let subscriptions;
describe('ListSubscriptionsService', () => {
  beforeEach(() => {
    fakeSubscriptionsRepository = new _FakeSubscriptionsRepository.default();
    listSubscriptions = new _ListSubscriptionsService.default(fakeSubscriptionsRepository);
    subscriptions = [];
  });
  it('should be able to list subscriptions', async () => {
    const subscription1 = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    const subscription2 = await fakeSubscriptionsRepository.create({
      title: 'Plano 2 de testes',
      value: 50
    });
    subscriptions.push(subscription1, subscription2);
    const findSubscriptions = await listSubscriptions.execute({
      page: '0',
      pageSize: '1'
    });
    expect(findSubscriptions).toEqual({
      subscriptions,
      total: 2,
      pages: 2
    });
  });
  it('should list all subscriptions if page or pagesize is empty', async () => {
    const subscription1 = await fakeSubscriptionsRepository.create({
      title: 'Plano de testes',
      value: 100
    });
    const subscription2 = await fakeSubscriptionsRepository.create({
      title: 'Plano 2 de testes',
      value: 50
    });
    subscriptions.push(subscription1, subscription2);
    const findSubscriptions = await listSubscriptions.execute({
      page: '',
      pageSize: '1'
    });
    expect(findSubscriptions).toEqual({
      subscriptions,
      total: 2,
      pages: 1
    });
  });
  it('should throw an exception if page or pagesize is not a number', async () => {
    await expect(listSubscriptions.execute({
      page: '0',
      pageSize: 'not a number'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(listSubscriptions.execute({
      page: 'not a number',
      pageSize: '1'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});