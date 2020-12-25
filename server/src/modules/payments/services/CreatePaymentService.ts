import { inject, injectable } from 'tsyringe';
import { parseISO } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IAthletesRepository from '@modules/athletes/repositories/IAthletesRepository';
import ICreatePaymentServiceDTO from '../dtos/ICreatePaymentServiceDTO';
import IPaymentsRepository from '../repositories/IPaymentsRepository';
import Payment from '../infra/typeorm/entities/Payment';

@injectable()
class CreatePaymentService {
  constructor(
    @inject('AthletesRepository')
    private athletesRepository: IAthletesRepository,

    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,
  ) { }

  public async execute({
    value,
    paymentDate,
    monthsPaid,
    athlete_id,
  }: ICreatePaymentServiceDTO): Promise<Payment> {
    if (!value) {
      throw new AppError(400, 'Valor do pagamento não deve ser vazio');
    }

    if (!paymentDate) {
      throw new AppError(400, 'Data do pagamento não deve ser vazia');
    }

    if (!monthsPaid) {
      throw new AppError(400, 'Quantidade de meses pagos deve ser informada');
    }

    if (!athlete_id) {
      throw new AppError(400, 'O aluno deve ser indicado no pagamento');
    }

    const athlete = await this.athletesRepository.findOne({ id: athlete_id });

    if (!athlete) {
      throw new AppError(404, 'Aluno não encontrado');
    }

    const parsedPaymentDate = parseISO(paymentDate);

    const nextDueDate = new Date(paymentDate);
    nextDueDate.setMonth(nextDueDate.getMonth() + monthsPaid);

    const payment = await this.paymentsRepository.create({
      value,
      paymentDate: parsedPaymentDate,
      monthsPaid,
      nextDueDate,
      athlete,
    });

    return payment;
  }
}

export default CreatePaymentService;
