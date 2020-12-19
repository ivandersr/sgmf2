import CreatePaymentService from './CreatePaymentService';

// let fakePaymentsRepository: FakePaymentsRepository;
let createPayment: CreatePaymentService;

describe('CreatePayment', () => {
  beforeEach(() => {
    // fakePaymentsRepository = new FakePaymentsRepository();
    createPayment = new CreatePaymentService();
  });

  it('should be able to create a new payment', async () => {
    const payment = await createPayment.execute({
      athlete_id: '123',
      monthsPaid: 3,
      paymentDate: new Date(2020, 11, 18).toDateString(),
      value: 100,
    });

    expect(payment).toHaveProperty('id');
    expect(payment.athlete_id).toBe('123');
    expect(payment.nextDueDate).toBe(new Date(2021, 2, 18));
  });
});
